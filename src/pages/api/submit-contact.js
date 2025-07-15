export async function POST({ request }) {
  try {
    const formData = await request.formData();
    
    // Extract form data
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      projectType: formData.get('project-type'),
      budget: formData.get('budget'),
      timeline: formData.get('timeline'),
      message: formData.get('message')
    };

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Name, email, and message are required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Format email content
    const emailSubject = `New Project Inquiry from ${data.name}`;
    const emailBody = `
New project inquiry received from Easy Production website:

CONTACT INFORMATION:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Company: ${data.company || 'Not provided'}

PROJECT DETAILS:
Project Type: ${data.projectType || 'Not specified'}
Budget Range: ${data.budget || 'Not specified'}
Timeline: ${data.timeline || 'Not specified'}

MESSAGE:
${data.message}

---
This email was sent from the Easy Production website contact form.
Timestamp: ${new Date().toISOString()}
`;

    // Send email using Web API (we'll use a simple fetch to a email service)
    // For now, we'll use a simple approach that works with most email services
    
    // Option 1: Use Resend (recommended)
    const resendApiKey = import.meta.env.RESEND_API_KEY;
    
    if (resendApiKey) {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'noreply@easyproduction.kg', // You'll need to verify this domain with Resend
          to: ['easymarketing865@gmail.com'],
          reply_to: data.email,
          subject: emailSubject,
          text: emailBody
        })
      });

      if (!emailResponse.ok) {
        throw new Error(`Email service error: ${emailResponse.status}`);
      }
    } else {
      // Fallback: Log the submission (you can set up email later)
      console.log('📧 New contact form submission:');
      console.log('Subject:', emailSubject);
      console.log('Body:', emailBody);
      console.log('---');
    }

    // Return success response
    return new Response(JSON.stringify({
      success: true,
      message: 'Thank you! Your project inquiry has been sent successfully. We\'ll get back to you within 24 hours.'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Sorry, there was an error sending your message. Please try again or contact us directly.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 
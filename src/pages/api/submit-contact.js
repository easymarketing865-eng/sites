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

    // Send email using Resend
    const resendApiKey = import.meta.env.RESEND_API_KEY;
    
    if (resendApiKey) {
      // Use Resend's domain initially (can be changed later to your own domain)
      const fromEmail = import.meta.env.FROM_EMAIL || 'onboarding@resend.dev';
      
      console.log('📧 Sending email via Resend...');
      
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: fromEmail,
          to: ['easymarketing865@gmail.com'],
          reply_to: data.email,
          subject: emailSubject,
          text: emailBody
        })
      });

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error('Resend API Error:', errorText);
        throw new Error(`Email service error: ${emailResponse.status} - ${errorText}`);
      }

      const emailResult = await emailResponse.json();
      console.log('✅ Email sent successfully via Resend:', emailResult.id);
      
    } else {
      // Fallback: Log the submission
      console.log('⚠️ RESEND_API_KEY not found. Logging submission instead:');
      console.log('📧 New contact form submission:');
      console.log('Subject:', emailSubject);
      console.log('Body:', emailBody);
      console.log('---');
      console.log('💡 To send actual emails, add RESEND_API_KEY environment variable');
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
export function generateWelcomeEmailHTML(userName?: string, userEmail?: string): string {
  const name = userName || 'there';
  const year = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to UMAttend</title>
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #ffffff;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff;">
          
           Header with Logo 
          <tr>
            <td align="center" style="padding: 40px 20px 30px;">
              <h1 style="margin: 0; font-size: 48px; font-weight: bold; line-height: 1.2;">
                <span style="color: #EAB308;">UM</span><span style="color: #000000;">Attend</span>
              </h1>
              <p style="margin: 12px 0 0; font-size: 16px; color: #666666; line-height: 1.5;">
                UMAttend on the latest events in the campus
              </p>
            </td>
          </tr>

           Welcome Message 
          <tr>
            <td style="padding: 0 40px;">
              <h2 style="margin: 0 0 20px; font-size: 28px; font-weight: bold; color: #000000; line-height: 1.3;">
                Welcome to UMAttend, ${name}! 🎉
              </h2>
              <p style="margin: 0 0 16px; font-size: 16px; color: #333333; line-height: 1.6;">
                Thank you for joining UMAttend! We're excited to have you as part of our campus community.
              </p>
              <p style="margin: 0 0 16px; font-size: 16px; color: #333333; line-height: 1.6;">
                With UMAttend, you can discover and attend the latest events happening on campus. From academic seminars to cultural performances, tech workshops to social gatherings – never miss out on what matters to you.
              </p>
            </td>
          </tr>

           Features List 
          <tr>
            <td style="padding: 20px 40px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0;">
                    <p style="margin: 0; font-size: 16px; color: #333333; line-height: 1.6;">
                      ✨ <strong>Discover Events</strong> – Browse upcoming campus activities
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <p style="margin: 0; font-size: 16px; color: #333333; line-height: 1.6;">
                      📅 <strong>RSVP Instantly</strong> – Reserve your spot with one click
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <p style="margin: 0; font-size: 16px; color: #333333; line-height: 1.6;">
                      🔔 <strong>Stay Updated</strong> – Get notified about events you care about
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <p style="margin: 0; font-size: 16px; color: #333333; line-height: 1.6;">
                      🤝 <strong>Connect</strong> – Meet fellow students at campus events
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

           CTA Button 
          <tr>
            <td align="center" style="padding: 30px 40px;">
              <a href="https://umattend.edu.ph/dashboard" style="display: inline-block; padding: 16px 40px; background-color: #EAB308; color: #000000; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; text-align: center;">
                Explore Events Now
              </a>
            </td>
          </tr>

          ${
            userEmail
              ? `
           Account Info 
          <tr>
            <td style="padding: 20px 40px; background-color: #F9FAFB; border-top: 1px solid #E5E7EB; border-bottom: 1px solid #E5E7EB;">
              <p style="margin: 0 0 8px; font-size: 14px; color: #666666; line-height: 1.5;">
                <strong>Your Account:</strong>
              </p>
              <p style="margin: 0; font-size: 14px; color: #333333; line-height: 1.5;">
                ${userEmail}
              </p>
            </td>
          </tr>
          `
              : ''
          }

           Help Section 
          <tr>
            <td style="padding: 30px 40px 20px;">
              <p style="margin: 0 0 12px; font-size: 16px; color: #333333; line-height: 1.6;">
                Need help getting started?
              </p>
              <p style="margin: 0; font-size: 14px; color: #666666; line-height: 1.6;">
                Our support team is here to help. Contact us at 
                <a href="mailto:support@umattend.edu.ph" style="color: #EAB308; text-decoration: none; font-weight: 600;">
                  support@umattend.edu.ph
                </a>
              </p>
            </td>
          </tr>

           Footer 
          <tr>
            <td align="center" style="padding: 30px 40px; border-top: 1px solid #E5E7EB;">
              <p style="margin: 0 0 8px; font-size: 12px; color: #999999; line-height: 1.5;">
                Powered by UMAttend Engineering Team
              </p>
              <p style="margin: 0; font-size: 12px; color: #999999; line-height: 1.5;">
                © ${year} UMAttend. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

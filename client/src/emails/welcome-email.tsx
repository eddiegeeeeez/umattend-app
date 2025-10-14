interface WelcomeEmailProps {
  userName?: string;
  userEmail?: string;
}

export const WelcomeEmail = ({ userName = 'there', userEmail }: WelcomeEmailProps) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to UMAttend</title>
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: '#ffffff',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}
      >
        <table
          role="presentation"
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#ffffff'
          }}
        >
          <tbody>
            <tr>
              <td align="center" style={{ padding: '40px 20px' }}>
                {/* Main Container */}
                <table
                  role="presentation"
                  style={{
                    maxWidth: '600px',
                    width: '100%',
                    borderCollapse: 'collapse',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <tbody>
                    {/* Header with Logo */}
                    <tr>
                      <td align="center" style={{ padding: '40px 20px 30px' }}>
                        <h1
                          style={{
                            margin: 0,
                            fontSize: '48px',
                            fontWeight: 'bold',
                            lineHeight: 1.2
                          }}
                        >
                          <span style={{ color: '#EAB308' }}>UM</span>
                          <span style={{ color: '#000000' }}>Attend</span>
                        </h1>
                        <p
                          style={{
                            margin: '12px 0 0',
                            fontSize: '16px',
                            color: '#666666',
                            lineHeight: 1.5
                          }}
                        >
                          UMAttend on the latest events in the campus
                        </p>
                      </td>
                    </tr>

                    {/* Welcome Message */}
                    <tr>
                      <td style={{ padding: '0 40px' }}>
                        <h2
                          style={{
                            margin: '0 0 20px',
                            fontSize: '28px',
                            fontWeight: 'bold',
                            color: '#000000',
                            lineHeight: 1.3
                          }}
                        >
                          Welcome to UMAttend, {userName}! 🎉
                        </h2>
                        <p
                          style={{
                            margin: '0 0 16px',
                            fontSize: '16px',
                            color: '#333333',
                            lineHeight: 1.6
                          }}
                        >
                          Thank you for joining UMAttend! We're excited to have you as part of our campus community.
                        </p>
                        <p
                          style={{
                            margin: '0 0 16px',
                            fontSize: '16px',
                            color: '#333333',
                            lineHeight: 1.6
                          }}
                        >
                          With UMAttend, you can discover and attend the latest events happening on campus. From academic seminars to cultural performances,
                          tech workshops to social gatherings – never miss out on what matters to you.
                        </p>
                      </td>
                    </tr>

                    {/* Features List */}
                    <tr>
                      <td style={{ padding: '20px 40px' }}>
                        <table role="presentation" style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <tbody>
                            <tr>
                              <td style={{ padding: '12px 0' }}>
                                <p style={{ margin: 0, fontSize: '16px', color: '#333333', lineHeight: 1.6 }}>
                                  ✨ <strong>Discover Events</strong> – Browse upcoming campus activities
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ padding: '12px 0' }}>
                                <p style={{ margin: 0, fontSize: '16px', color: '#333333', lineHeight: 1.6 }}>
                                  📅 <strong>RSVP Instantly</strong> – Reserve your spot with one click
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ padding: '12px 0' }}>
                                <p style={{ margin: 0, fontSize: '16px', color: '#333333', lineHeight: 1.6 }}>
                                  🔔 <strong>Stay Updated</strong> – Get notified about events you care about
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ padding: '12px 0' }}>
                                <p style={{ margin: 0, fontSize: '16px', color: '#333333', lineHeight: 1.6 }}>
                                  🤝 <strong>Connect</strong> – Meet fellow students at campus events
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* CTA Button */}
                    <tr>
                      <td align="center" style={{ padding: '30px 40px' }}>
                        <a
                          href="https://umattend.edu.ph/dashboard"
                          style={{
                            display: 'inline-block',
                            padding: '16px 40px',
                            backgroundColor: '#EAB308',
                            color: '#000000',
                            textDecoration: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '600',
                            textAlign: 'center'
                          }}
                        >
                          Explore Events Now
                        </a>
                      </td>
                    </tr>

                    {/* Account Info */}
                    {userEmail && (
                      <tr>
                        <td
                          style={{
                            padding: '20px 40px',
                            backgroundColor: '#F9FAFB',
                            borderTop: '1px solid #E5E7EB',
                            borderBottom: '1px solid #E5E7EB'
                          }}
                        >
                          <p
                            style={{
                              margin: '0 0 8px',
                              fontSize: '14px',
                              color: '#666666',
                              lineHeight: 1.5
                            }}
                          >
                            <strong>Your Account:</strong>
                          </p>
                          <p
                            style={{
                              margin: 0,
                              fontSize: '14px',
                              color: '#333333',
                              lineHeight: 1.5
                            }}
                          >
                            {userEmail}
                          </p>
                        </td>
                      </tr>
                    )}

                    {/* Help Section */}
                    <tr>
                      <td style={{ padding: '30px 40px 20px' }}>
                        <p
                          style={{
                            margin: '0 0 12px',
                            fontSize: '16px',
                            color: '#333333',
                            lineHeight: 1.6
                          }}
                        >
                          Need help getting started?
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontSize: '14px',
                            color: '#666666',
                            lineHeight: 1.6
                          }}
                        >
                          Our support team is here to help. Contact us at{' '}
                          <a
                            href="mailto:support@umattend.edu.ph"
                            style={{
                              color: '#EAB308',
                              textDecoration: 'none',
                              fontWeight: '600'
                            }}
                          >
                            support@umattend.edu.ph
                          </a>
                        </p>
                      </td>
                    </tr>

                    {/* Footer */}
                    <tr>
                      <td
                        align="center"
                        style={{
                          padding: '30px 40px',
                          borderTop: '1px solid #E5E7EB'
                        }}
                      >
                        <p
                          style={{
                            margin: '0 0 8px',
                            fontSize: '12px',
                            color: '#999999',
                            lineHeight: 1.5
                          }}
                        >
                          Powered by UMAttend Engineering Team
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontSize: '12px',
                            color: '#999999',
                            lineHeight: 1.5
                          }}
                        >
                          © {new Date().getFullYear()} UMAttend. All rights reserved.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
};

export default WelcomeEmail;

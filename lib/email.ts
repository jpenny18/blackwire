import { Resend } from 'resend';

// Initialize Resend with API key (only used in server components/API routes)
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send notification email for crypto order
 * @param order Crypto order details
 * @returns Email send result
 */
export async function sendCryptoOrderEmail(order: {
  id: string;
  status: string;
  cryptoType: string;
  cryptoAmount: string;
  cryptoAddress: string;
  usdAmount: number;
  verificationPhrase: string;
  challengeType: string;
  challengeAmount: string;
  platform: string;
  addOns?: string[];
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  customerCountry: string;
  customerDiscordUsername?: string;
  createdAt: string;
}) {
  try {
    console.log('Sending crypto order notification emails for:', order.id);
    
    // Define add-on names mapping
    const addOnNames: { [key: string]: string } = {
      'no-min-days': 'No Min Trading Days',
      'profit-split-80': '80% Initial Profit Split',
      'leverage-500': '1:500 Leverage',
      'reward-150': '150% Reward'
    };
    
    // Send admin notification
    const adminResult = await resend.emails.send({
      from: 'support@blackwiretrading.vip',
      to: 'support@blackwiretrading.vip',
      subject: order.status === 'COMPLETED' 
        ? `Crypto Payment Confirmed: ${order.challengeType} Challenge (${order.challengeAmount})`
        : `New Crypto Order: ${order.challengeType} Challenge (${order.challengeAmount})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="background-color: #0D0D0D; padding: 15px; margin-bottom: 20px; border-radius: 5px;">
            <h1 style="color: #0FF1CE; margin: 0; font-size: 24px;">
              ${order.status === 'COMPLETED' ? 'Crypto Payment Confirmed' : 'New Crypto Order Received'}
            </h1>
          </div>
          
          <div style="margin-bottom: 30px;">
            <p style="margin-bottom: 5px;"><strong>Order ID:</strong> ${order.id}</p>
            <p style="margin-bottom: 5px;"><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
            <p style="margin-bottom: 5px;"><strong>Status:</strong> ${order.status}</p>
          </div>
          
          <div style="margin-bottom: 30px;">
            <h2 style="color: #0FF1CE; font-size: 18px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Customer Details</h2>
            <p style="margin-bottom: 5px;"><strong>Name:</strong> ${order.customerName}</p>
            <p style="margin-bottom: 5px;"><strong>Email:</strong> ${order.customerEmail}</p>
            <p style="margin-bottom: 5px;"><strong>Phone:</strong> ${order.customerPhone}</p>
            <p style="margin-bottom: 5px;"><strong>Country:</strong> ${order.customerCountry}</p>
            ${order.customerDiscordUsername ? `<p style="margin-bottom: 5px;"><strong>Discord:</strong> ${order.customerDiscordUsername}</p>` : ''}
          </div>
          
          <div style="margin-bottom: 30px;">
            <h2 style="color: #0FF1CE; font-size: 18px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Order Details</h2>
            <p style="margin-bottom: 5px;"><strong>Challenge Type:</strong> ${order.challengeType}</p>
            <p style="margin-bottom: 5px;"><strong>Account Size:</strong> ${order.challengeAmount}</p>
            <p style="margin-bottom: 5px;"><strong>Platform:</strong> ${order.platform}</p>
            ${order.addOns && order.addOns.length > 0 ? `
              <p style="margin-bottom: 5px;"><strong>Add-ons:</strong></p>
              <ul style="margin: 0 0 5px 20px; padding: 0;">
                ${order.addOns.map(addOn => `<li style="margin-bottom: 2px;">${addOnNames[addOn] || addOn}</li>`).join('')}
              </ul>
            ` : ''}
            <p style="margin-bottom: 5px;"><strong>Payment Method:</strong> Cryptocurrency (${order.cryptoType})</p>
            <p style="margin-bottom: 5px;"><strong>Crypto Amount:</strong> ${order.cryptoAmount} ${order.cryptoType}</p>
            <p style="margin-bottom: 5px;"><strong>USD Amount:</strong> $${order.usdAmount.toFixed(2)}</p>
            <p style="margin-bottom: 5px;"><strong>Wallet Address:</strong> ${order.cryptoAddress}</p>
            <p style="margin-bottom: 5px;"><strong>Verification Phrase:</strong> ${order.verificationPhrase}</p>
          </div>
        </div>
      `
    });

    // Send customer notification
    const customerResult = await resend.emails.send({
      from: 'support@blackwiretrading.vip',
      to: order.customerEmail,
      subject: order.status === 'COMPLETED'
        ? `Payment Confirmed - Your Blackwire ${order.challengeType} Challenge`
        : `Your Blackwire ${order.challengeType} Challenge Order`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="background-color: #0D0D0D; padding: 20px; margin-bottom: 20px; border-radius: 5px; text-align: center;">
            <h1 style="color: #0FF1CE; margin: 0; font-size: 24px;">
              ${order.status === 'COMPLETED' ? 'Payment Confirmed!' : 'Thanks for your order!'}
            </h1>
          </div>
          
          <div style="margin-bottom: 30px;">
            <p>Hello ${order.customerName.split(' ')[0]},</p>
            ${order.status === 'COMPLETED' 
              ? `<p>Great news! We've confirmed your crypto payment for the ${order.challengeType} Challenge. Your order is now being processed.</p>
                 <p>Due to high demand, please allow up to 1 hour for your login credentials to be generated. In some cases, this might take up to 24 hours.</p>`
              : `<p>Thank you for purchasing our ${order.challengeType} Challenge. We're excited to see how you perform!</p>
                 <p>We've received your crypto payment request and will verify the transaction. Once confirmed, we'll prepare your trading account credentials.</p>`
            }
          </div>
          
          <div style="margin-bottom: 30px; background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
            <h2 style="color: #333; font-size: 18px; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Order Summary</h2>
            <p style="margin-bottom: 5px;"><strong>Order ID:</strong> ${order.id}</p>
            <p style="margin-bottom: 5px;"><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
            <p style="margin-bottom: 5px;"><strong>Challenge Type:</strong> ${order.challengeType}</p>
            <p style="margin-bottom: 5px;"><strong>Account Size:</strong> ${order.challengeAmount}</p>
            <p style="margin-bottom: 5px;"><strong>Platform:</strong> ${order.platform}</p>
            ${order.addOns && order.addOns.length > 0 ? `
              <p style="margin-bottom: 5px;"><strong>Add-ons:</strong></p>
              <ul style="margin: 0 0 5px 20px; padding: 0;">
                ${order.addOns.map(addOn => `<li style="margin-bottom: 2px;">${addOnNames[addOn] || addOn}</li>`).join('')}
              </ul>
            ` : ''}
            <p style="margin-bottom: 5px;"><strong>Payment Amount:</strong> ${order.cryptoAmount} ${order.cryptoType}</p>
            <p style="margin-bottom: 5px;"><strong>USD Value:</strong> $${order.usdAmount.toFixed(2)}</p>
          </div>
          
          ${order.status !== 'COMPLETED' ? `
          <div style="margin-bottom: 30px; background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
            <h2 style="color: #333; font-size: 18px; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Payment Verification Details</h2>
            <p style="margin-bottom: 5px;"><strong>Verification Phrase:</strong> <span style="font-family: monospace; background-color: #eee; padding: 2px 4px; border-radius: 3px;">${order.verificationPhrase}</span></p>
            <p style="margin-top: 10px; color: #666; font-size: 14px;">Please keep these details for your records. They help us match your payment to your order.</p>
          </div>
          ` : ''}
          
          <div style="margin-bottom: 30px;">
            <h2 style="color: #0FF1CE; font-size: 18px; margin-bottom: 15px;">Next Steps</h2>
            
            ${order.status === 'COMPLETED' ? `
            <div style="margin-bottom: 15px; display: flex; align-items: flex-start;">
              <div style="background-color: #0FF1CE; color: #000; border-radius: 50%; width: 25px; height: 25px; display: flex; justify-content: center; align-items: center; margin-right: 10px; flex-shrink: 0;">1</div>
              <div>
                <h3 style="margin: 0 0 5px 0; color: #333;">Receive Your Login Credentials</h3>
                <p style="margin: 0; color: #666;">We're preparing your login credentials now. You'll receive them in a separate email within 1-24 hours.</p>
              </div>
            </div>
            
            <div style="margin-bottom: 15px; display: flex; align-items: flex-start;">
              <div style="background-color: #0FF1CE; color: #000; border-radius: 50%; width: 25px; height: 25px; display: flex; justify-content: center; align-items: center; margin-right: 10px; flex-shrink: 0;">2</div>
              <div>
                <h3 style="margin: 0 0 5px 0; color: #333;">Start Trading</h3>
                <p style="margin: 0; color: #666;">Once you receive your credentials, you can begin trading. No hoops. No games. Just trade.</p>
              </div>
            </div>
            ` : `
            <div style="margin-bottom: 15px; display: flex; align-items: flex-start;">
              <div style="background-color: #0FF1CE; color: #000; border-radius: 50%; width: 25px; height: 25px; display: flex; justify-content: center; align-items: center; margin-right: 10px; flex-shrink: 0;">1</div>
              <div>
                <h3 style="margin: 0 0 5px 0; color: #333;">Payment Verification</h3>
                <p style="margin: 0; color: #666;">We'll verify your crypto payment. This usually takes 30-60 minutes but may take longer depending on network conditions.</p>
              </div>
            </div>
            
            <div style="margin-bottom: 15px; display: flex; align-items: flex-start;">
              <div style="background-color: #0FF1CE; color: #000; border-radius: 50%; width: 25px; height: 25px; display: flex; justify-content: center; align-items: center; margin-right: 10px; flex-shrink: 0;">2</div>
              <div>
                <h3 style="margin: 0 0 5px 0; color: #333;">Receive Your Login Credentials</h3>
                <p style="margin: 0; color: #666;">Once payment is confirmed, we'll send your login credentials to this email address.</p>
              </div>
            </div>
            
            <div style="margin-bottom: 15px; display: flex; align-items: flex-start;">
              <div style="background-color: #0FF1CE; color: #000; border-radius: 50%; width: 25px; height: 25px; display: flex; justify-content: center; align-items: center; margin-right: 10px; flex-shrink: 0;">3</div>
              <div>
                <h3 style="margin: 0 0 5px 0; color: #333;">Start Trading</h3>
                <p style="margin: 0; color: #666;">Begin trading with your new account. No evaluation. Just capital allocation.</p>
              </div>
            </div>
            `}
          </div>
          
          <div style="margin-bottom: 30px;">
            <p>If you have any questions or need assistance, please contact our support team at <a href="mailto:support@blackwiretrading.vip" style="color: #0FF1CE;">support@blackwiretrading.vip</a>.</p>
            <p style="margin-bottom: 0;">Best regards,</p>
            <p style="margin-top: 5px;"><strong>The Blackwire Team</strong></p>
          </div>
          
          <div style="background-color: #0D0D0D; padding: 15px; border-radius: 5px; text-align: center; font-size: 12px; color: #999;">
            <p style="margin-bottom: 5px;">© ${new Date().getFullYear()} Blackwire Trading. All rights reserved.</p>
            <p style="margin: 0;">This is an automated email, please do not reply.</p>
          </div>
        </div>
      `
    });

    return {
      success: true,
      adminEmail: adminResult,
      customerEmail: customerResult
    };
  } catch (error) {
    console.error('Error sending crypto order emails:', error);
    return { success: false, error };
  }
}

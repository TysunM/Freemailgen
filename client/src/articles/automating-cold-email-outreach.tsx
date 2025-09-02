export function AutomatingOutreach() {
    return (
        <>
            <p>The eternal dilemma of sales outreach is scale versus personalization. Do you send 1,000 generic emails and hope for a 0.5% reply rate, or do you spend a full day crafting 10 perfect emails? With modern automation tools, you no longer have to choose. The key is to automate the process, not the personality. This guide will show you how to scale your outreach while ensuring every email feels personal and genuine.</p>

            <h2>The Philosophy: Automate the Mechanical, Personalize the Meaningful</h2>
            <p>Effective automation isn't about creating robots to talk to humans. It's about using technology to handle the repetitive tasks so you can focus your creative energy on the parts that matter most.
            </p>
            <ul>
                <li><strong>Automate This:</strong> Sending follow-ups, tracking opens and clicks, scheduling sends for optimal times, removing bounced emails from your list.</li>
                <li><strong>Personalize This:</strong> The opening line, the specific pain point you're addressing, the call-to-action, and any references to their company or work.</li>
            </ul>

            <h2>The Hybrid Approach: Using Custom Fields (Snippets)</h2>
            <p>The secret to personalization at scale lies in the clever use of custom fields, often called "snippets" or "merge tags." Go beyond the basic `{{firstName}}` and `{{companyName}}`. Create custom columns in your prospect list for deeper personalization.</p>
            <p><strong>Example Custom Fields:</strong></p>
            <ul>
                <li><strong>`{{OpeningLine}}`</strong>: A unique, hand-written sentence for each prospect. This is the most important part. Spend 1-2 minutes researching each prospect on LinkedIn and write a genuine opening line.</li>
                <li><strong>`{{PainPoint}}`</strong>: Based on their industry or job title, select a common pain point from a pre-written list (e.g., "managing a remote sales team," "reducing customer churn").</li>
                <li><strong>`{{CaseStudy}}`</strong>: A link to a case study of a client in a similar industry.</li>
            </ul>

            <h3>Putting It Together in a Template:</h3>
            <p>Your email template in an automation tool (like Outreach, Salesloft, or Mailshake) would then look like this:</p>
            <p><strong>Subject:</strong> Idea re: `{{PainPoint}}`</p>
            <p>
                `Hi {{firstName}},`
                <br /><br />
                `{{OpeningLine}}`
                <br /><br />
                `I'm reaching out because many VPs of Sales I speak with are struggling with {{PainPoint}}. Given your role at {{companyName}}, I thought you might be facing similar challenges.`
                <br /><br />
                `We recently helped {{CaseStudy}} achieve a 20% increase in outbound meetings by tackling this head-on.`
                <br /><br />
                `Are you open to a brief 15-minute chat next week to see if this is something that could help your team?`
            </p>
            <p>With this method, the core of the email is automated, but the most impactful parts are deeply personalized, giving you the best of both worlds.</p>
            
            <h2>Automating Your Follow-Up Sequence</h2>
            <p>This is where automation truly shines. No one can manually keep track of sending 3-5 follow-ups to hundreds of prospects. Set up an automated sequence that stops immediately once a prospect replies.</p>
            <ul>
                <li><strong>Step 1 (Day 1):</strong> The personalized email above is sent.</li>
                <li><strong>Step 2 (Day 3):</strong> If no reply, automatically send a short bump: "Just wanted to make sure you saw this."</li>
                <li><strong>Step 3 (Day 7):</strong> If no reply, automatically send a value-add email with a link to a blog post or webinar.</li>
                <li><strong>Step 4 (Day 14):</strong> If no reply, automatically send the "breakup" email.</li>
            </ul>
            <p>This ensures persistent, polite follow-up without any manual effort. By strategically combining manual research with powerful automation tools, you can build a scalable outreach engine that still feels human and gets results.</p>
        </>
    );
}

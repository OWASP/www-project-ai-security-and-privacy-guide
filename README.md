AI security and privacy guide
===============================
AI applications are on the rise and so are the concerns regarding AI safety, privacy, ethicality, fairness, trustworthiness, robustness, security etc. This guide wants to provide clear and actionable insights on designing, creating, testing and procuring secure and privacy-preserving AI systems. 

# Project status
This project was founded in January 2023 by [Rob van der Veer](https://www.linkedin.com/in/robvanderveer/), senior director at Software Improvement Group, lead author of the [ISO/IEC 5338](https://www.iso.org/standard/81118.html) standard on AI engineering, with 30 years experience in AI, security and privacy. Rob also contributes to [OWASP SAMM](https://owaspsamm.org/guidance/agile/) and is co-lead of the Integration standards project - known for its [Wayfinder](https://owasp.org/www-project-integration-standards/) and [OpenCRE.org](https://www.opencre.org/). Contact: rob.vanderveer AT owasp.org

Kudos to SIG for supporting the idea to open source results coming from SIG research and from working with SIG clients on making their AI successful.

The purpose is to collect and present the state of the art on the topic through community collaboration. First in the form of this README, and later probably in other document forms. Please provide your input through Pull requests or by submitting issues, and let's make this guide better and better.

# How to deal with AI security
1. Keep on doing everything you are already doing for cybersecurity
2. Incorporate AI developers, data scientists, and AI-related applications and infrastructure into your security programs: training, requirements, static analysis, code review, pentesting, etc.
3. Also go beyond security by applying good software engineering protocols to your AI practices, such as versioning, documentation, unit testing, integration testing, performance testing, and code quality. See the [ISO/IEC 5338](https://www.iso.org/standard/81118.html) standard for guidelines. This way, AI systems will become easier to maintain, to transfer, be reliable, and future-proof.
4. Make sure that everybody involved is aware of ‘special’ AI security risks, including:
* The protection of data and data processing, which are all-important in machine learning
* AI model attacks: data poisoning, input manipulation, data reverse engineering, and model theft, which all require deep machine learning knowledge and not security expertise per se. Read more at [BIML](https://berryvilleiml.com/taxonomy/), [ENISA](https://www.enisa.europa.eu/publications/securing-machine-learning-algorithms), and [Microsoft](https://docs.microsoft.com/en-us/security/failure-modes-in-machine-learning). We will epand on these attacks more in this guide later in time.
* More aspects can be found in ISO/IEC 5338 and the upcoming ISO/IEC 27090 on AI security and 27091 on AI privacy. 

## Scope creep of security

5. Try to avoid dragging every ‘popular’ AI risk into the security activity, such as transparency, fairness, and correctness. They are important, but it’s better to divide and conquer AI issues in an organization, instead of making everybody responsible for everything. In the end, that makes nobody responsible.

Another example of scope creep is 'safety'. Given the role of AI systems, this is a prominent theme. It is of course related to security, especially when talking about the integrity of data. However, there are sides to safety that are not of direct concern from the security perspectice, in particular regarding the correctness of an AI model.

In other words, the main recommendation to security officers and development teams is to treat AI pragmatically. No need to be philosophical or overwhelmed. AI is software with a few extra aspects that we are becoming increasingly familiar with. 

The security part of the guide was initally published as a [blog](https://www.softwareimprovementgroup.com/resources/how-artificial-intelligence-attacked-my-family-and-other-ai-security-lessons/).

# How to deal with AI privacy
When looking at the GDPR and the ISO/IEC 29100 standard on data protection, the following principles for privacy in systems follow: 
* Data minimisation
* Lawfulness and consent
* Individual rights and data quality
* Purpose binding and limitation
* Transparency & openness
* Accountability & compliance
* Information security 

These principles all apply to AI systems and typically in the same way as for non-AI systems, with the following exceptions:

1. Lawfulness, individual rights and transparency: the GDPR and the upcoming EU AI act mention a number of things about algorithms regarding these topics. Mostly the discussion is about human right aspects that are not about privacy in the sense of data protection per se. For example: the right of equal treatment is often discussed around AI, but it's not a privacy issue as it does not concern data protection directly. 

    Relevant GDPR article: article 22 "Automated individual decision-making, including profiling", in particular recital 71 on explanation. This could suggest that individual AI decisions on individuals always need to be explained in great detail, but in practice it has sufficed to provide documentation on how the algorithm works in general and how the algorithm was constructed and trained. See the [article 29 working party guidelines on this topic](https://ec.europa.eu/newsroom/article29/items/612053/en) 
    
    Article 22 also requires human oversight on automated decisions which produce "legal" or "similarly significant" effects on that person.

2. Information security:  
AI security has some particularities that are of course relevant for data protection. See elsewhere in this guide for more information - especially the fact that AI systems are very data intensive. 
Regarding data: in machine learning, data scientists need access to real data for training and testing, which is different from most other situations where test data can be used that is less sensitive. This makes data protection of data in the development process very important. 

3. Purpose binding, limitation, lawfulness, consent and compliance
These privacy principles put strong limitations on what data you can collect, for wat purpose and how long you can keep it. This profoundly changes the possibilities of AI and big data and calls for privacye-preserving techniques:
* distributed data analysis: exchange anonymous aggregated data
* secure multi-party computation: store data distributed-encrypted
* data enclaves: store pooled personal data in restricted secure environments 

## Scope creep of privacy
As said, many of the discussion topics on AI are about human rights and a part of it has to do with data protection. There are even aspects sometimes refered to by the term 'privacy' that are not directly about data protection, for example when referring to autonomy and the right to a private life. So as a data protection officer or engineer it's important not to drag everything into your responsibilities. At the same time, organisation do need to assign those non-privacy AI responsibilities somewhere.

Having said that, it is to be expected that data protection officers are the people that typically will also be assigned a role regarding governance of AI beyond privacy. 

The GDPR does not restrict the applications of AI explicitly, apart from requiring purpose binding and consent. In contrast, the EU AI act does pose application limitations, such as mass surveillance, predictive policing and restrictions on high risk purposes such as selecting people for jobs. In addition there are regulations for specific domains that restrict the use of data, putting limits to some AI approaches (e.g. the medical domain). 

---

layout: col-sidebar
title: OWASP AI Security and Privacy Guide
tags: AIsecpri AI security privacy requirements guide machinelearning algorithms
level: 2
type: documentation
pitch: Guidance on designing, creating, testing, and procuring secure and privacy-preserving AI systems

---
![alt text](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/aisecprivlogosml.jpg?raw=true "AI security & privacy guide")

AI applications are on the rise and so are the concerns regarding AI security and privacy. This guide wants to provide clear and actionable insights on designing, creating, testing, and procuring secure and privacy-preserving AI systems. 

This guide is going to be officially launched during the OWASP Global appsec event in Dublin on February 15 at 11:30 during [Rob van der Veer's talk](https://sched.co/1F9DT). 

# How to deal with AI security
1. Keep on doing everything you are already doing for cybersecurity, and if you're not doing anything: please start. [SAMM](https://owaspsamm.org/) is OWASP's model to help you grow.
2. Incorporate AI developers, data scientists, and AI-related applications and infrastructure into your security programs: risk analysis, training, requirements, static analysis, code review, pentesting, etc.
3. Also go beyond security by applying good software engineering practices to your AI activities, such as versioning, documentation, unit testing, integration testing, performance testing, and code quality. See the [ISO/IEC 5338](https://www.iso.org/standard/81118.html) standard for guidelines. This way, AI systems will become easier to maintain, transferable, more reliable, and future-proof. A best practice is to mix data scientist profiles with software engineering profiles in teams, as software engineers typically need to learn more about data science and data scientists typically need to learn more about creating future-proof code that is easy to maintain and test.

4. Make sure that everybody involved is aware of ‘special’ AI security risks:

* **Data attack surface**: Data and data processing are typically a large and important part of machine learning applications, and they require appropriate security.

* **Real data for engineers**: In order to train and test a working model, data scientists need access to real data, which may be sensitive. This is different from non-AI engineering in which typically the test data can be either synthesized or anonymized carefully. An appropriate countermeasure is the limitation of access to this data to the engineers that really need it, and shield it from the rest of the team. In addition, some AI platforms provide mechanisms that allow training and testing a model without the data scientists having access to the data.

* AI model attacks, which all require deep machine learning knowledge and not application security expertise per se - see also [BIML](https://berryvilleiml.com/taxonomy/), [ENISA](https://www.enisa.europa.eu/publications/securing-machine-learning-algorithms), and [Microsoft](https://docs.microsoft.com/en-us/security/failure-modes-in-machine-learning):

  * **data poisoning** of training data: by changing  training data, the behavior of the model can be manipulated. This can either sabotage the model or have it make decisions in favor of the attacker. This attack can work like a Trojan horse so that the model appears to work in a normal way, but for specific manipulated inputs a decision is forced. See for example [this article on fooling self-driving cars](https://arxiv.org/abs/1602.02697). This way, for example fraudulent money transfers can go undetected when containing such trigger elements.

  * **input manipulation**: by playing with the model input, a model can be deceived (e.g. spam e-mail being classified as not spam), for example in combination with data poisoning. This is also called an adversarial attack or model evasion. Robust-performing models are the best mitigation, together with the mitigations for poisoning.

  * **training data reconstruction**: by interacting with or by analysing a model, it can be possible to reverse engineer sensitive information that was part of the training set. If this is done by analysising neural network parameters, this is called model inversion. Best practices: avoid sensitive data/personal data in the training set, and for model inversion: avoid models overtraining, for example by having sufficiently large training sets. It can also help to put limitations on access to the model to prevent playing with it or inspecting it. A special type of this attack is when it is possible to infer whether specific data (e.g. an individual) was part of the dataset, called 'membership inference'. Large language models also have their challenges here. Query-answer models have the risk of providing answers with sensitive training data, and chat systems can be manipulated to reveal classified data - such as [Bing in February 2023](https://arstechnica.com/information-technology/2023/02/ai-powered-bing-chat-spills-its-secrets-via-prompt-injection-attack/)


  * **model theft**: by playing with a model, the model behavior can be copied (which can be intellectual property). Also here, limiting model execution can mitigate this. An interesting example is how easy it can be to copy the behaviour of a fine-tuned language model (e.g. BERT) by presenting it with example text, taking its output and then train a new model with these inputs and outputs - as described in ['Thieves on Sesame street'](https://arxiv.org/abs/1910.12366)

* **AI code reuse**: Data scientists benefit tremendously from many example projects that can be found online, which may contain security and privacy weaknesses. Conscious curation of such code reuse is in order, just like in any software engineering.

* **AI code maintainability**: Data scientists are primarily trained to produce working models, and typically less to create maintainable code that is easy to read for others during a long time to come. This can hurt the testability and readability of AI code, leading to errors or security weaknesses that remain hidden to the eye. This risk can be addressed by training data scientists to write maintainable code, measuring maintainability, and mix software engineering expertise in data science teams.

* More aspects can be found in [ISO/IEC 5338](https://www.iso.org/standard/81118.html) and the upcoming ISO/IEC 27090 on AI security and 27091 on AI privacy. 

## Scope boundaries of AI security

Try to avoid dragging every ‘popular’ AI risk into the security activity, such as algorithmic bias, transparency, and correctness. They are important, but it’s better to divide and conquer AI issues in an organization, instead of making everybody responsible for everything. In the end, that makes nobody responsible.

Another example of scope creep is 'safety'. Given the role of AI systems, this is a prominent theme. It is of course related to security, especially when talking about the integrity of data. However, there are sides to safety that are not of direct concern from the security perspective, in particular regarding the correctness of an AI model.

In other words, the main recommendation to security officers and development teams is to treat AI pragmatically. No need to be philosophical or overwhelmed. AI is software with a few extra aspects that we are becoming increasingly familiar with. 

The security part of the guide was initially published as a [blog](https://www.softwareimprovementgroup.com/resources/how-artificial-intelligence-attacked-my-family-and-other-ai-security-lessons/).

# How to deal with AI privacy
We discuss this topic using the GDPR as it is a useful frame of reference. This is not a guide on privacy engineering of systems in general. For that purpose, please consider work from [ENISA](https://www.enisa.europa.eu/publications/data-protection-engineering), [NIST](https://nvlpubs.nist.gov/nistpubs/ir/2017/NIST.IR.8062.pdf), [mplsplunk](https://github.com/mplspunk/awesome-privacy-engineering), [OWASP](https://owasp.org/www-project-top-10-privacy-risks/) and [OpenCRE](https://www.opencre.org/cre/362-550). The general principle for engineers is to regard personal data as 'radioactive gold'. It's valuable, but it's also something to minimize, carefully store, carefully handle, limit sending it away, keep track of where it is, etc.

The GDPR identifies the following general principles in [article 5](https://gdpr.eu/article-5-how-to-process-personal-data/): 
* Lawfulness, fairness, and transparency
* Limitations on purposes of collection, processing, and storage
* Data minimization
* Accuracy of data
* Data storage limits
* Integrity and confidentiality

These principles all apply to AI systems and typically in the same way as to non-AI systems, with the following exceptions:

1. **Lawfulness, fairness, and transparency**:
 
    The GDPR and the upcoming EU AI act mention several things about algorithms regarding these topics. Mostly the discussion is about human rights aspects that are not about privacy in the sense of data protection per se. For example, the right to equal treatment is often discussed around AI, but it's not a privacy issue as it does not concern data protection directly. 

    Relevant GDPR article: [article 22](https://gdpr.eu/article-22-automated-individual-decision-making/) "Automated individual decision-making, including profiling".
    
    Regarding explanations: an exact description of all specific algorithm steps for a specific algorithm outcome is not required, but meaningful information about the data, the modeling process and the type of algorithm needs to be provided, and what the likely consequences are for individuals. There are exceptions when specific regulations are in place, for example, the US [Equal Credit Opportunity Act](https://www.consumerfinance.gov/about-us/newsroom/cfpb-acts-to-protect-the-public-from-black-box-credit-models-using-complex-algorithms/) requiring detailed explanations on individual decisions by algorithms that deny credit. For more details, see the [article 29 working party guidelines on this topic](https://ec.europa.eu/newsroom/article29/items/612053/en) and [article 13 in the EU AI act](https://artificialintelligenceact.com/title-iii/chapter-2/article-13/)
    
    Article 22 also requires appropriate human oversight on automated decisions that produce "legal" or "similarly significant" effects on that person. See [article 14 in the EU AI act](https://artificialintelligenceact.com/title-iii/chapter-2/article-14/)

2. **Integrity and confidentiality**:

    See also AI security in this guide. AI security has some particularities that are of course relevant for data protection - as AI systems are typically data intensive. 
Regarding data: in machine learning, data scientists need access to real data for training and testing, which is different from most other situations where test data can be used that is less sensitive. This makes data protection of data in the development process very important.
In addition, the model attack called 'data reverse engineering' from the AI security section is a privacy threat, because it may allow to reconstruct personal data from a model, or infer if a person was part of the training set.

3. **Lawfulness and limitations on purposes of collection, processing, and storage**:

    These privacy principles put strong limitations on what data you can collect, for what purpose, and how long you can keep it. This profoundly changes the possibilities of AI and big data and calls for privacy-preserving techniques:
    * distributed data analysis: exchange anonymous aggregated data
    * secure multi-party computation: store data distributed-encrypted
    * data enclaves: store pooled personal data in restricted secure environments 

Further reading:
* [ICO guidance on AI and data protection](https://ico.org.uk/for-organisations/guide-to-data-protection/key-dp-themes/guidance-on-ai-and-data-protection/)
* [FPF case-law analysis on automated decision making](https://fpf.org/blog/fpf-report-automated-decision-making-under-the-gdpr-a-comprehensive-case-law-analysis/)

## Scope boundaries of AI privacy
As said, many of the discussion topics on AI are about human rights and only a part of it has to do with privacy. There are even aspects sometimes referred to by the term 'privacy' that are not directly about what we consider privacy in this guide (general protection of personal data), for example when referring to autonomy and the right to a private life. So as a data protection officer or engineer it's important not to drag everything into your responsibilities. At the same time, organizations do need to assign those non-privacy AI responsibilities somewhere.

Having said that, it is to be expected that data protection officers are the people that typically will also be assigned a role regarding the governance of AI beyond privacy. 

## Before you start: Privacy restrictions on what you can do with AI
The GDPR does not restrict the applications of AI explicitly but does provide safeguards that may limit what you can do, in particular regarding Lawfulness and limitations on purposes of collection, processing, and storage - as mentioned above. For more information on lawful grounds, see [article 6](https://gdpr.eu/article-6-how-to-process-personal-data-legally/)

In contrast, the [EU AI act](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:52021PC0206&from=EN) does pose explicit application limitations, such as mass surveillance, predictive policing, and restrictions on high-risk purposes such as selecting people for jobs. In addition, there are regulations for specific domains that restrict the use of data, putting limits to some AI approaches (e.g. the medical domain). 

In an upcoming update, more will be discussed on the [US AI bill of rights](https://www.whitehouse.gov/ostp/ai-bill-of-rights/).

# Project status
This page is the current outcome of the project. The goal is to collect and present the state of the art on these topics through community collaboration. First in the form of this page, and later in other document forms. Please provide your input through pull requests / submitting issues (see [repo](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/)) or emailing the project lead, and let's make this guide better and better. 

The work in this guide will serve as input to the upcoming [ISO/IEC 27090 (AI security)](https://www.iso.org/standard/56581.html) and [27091 (AI privacy)](https://standardsdevelopment.bsigroup.com/projects/9022-07819#/section) standards, which will be done through membership of the ISO/IEC JTC 1/SC42 AHG4 group.

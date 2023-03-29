---

layout: col-sidebar
title: OWASP AI Security and Privacy Guide
tags: AIsecpri AI security privacy requirements guide machinelearning algorithms
level: 2
type: documentation
pitch: Guidance on designing, creating, testing, and procuring secure and privacy-preserving AI systems

---
<img src="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/aisecprivlogosml.jpeg?raw=true" width="600" height ="127"><img src="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/humansonly.png?raw=true" align="right"/>

Artificial Intelligence is on the rise and so are the concerns regarding AI security and privacy. This guide wants to provide clear and actionable insights on designing, creating, testing, and procuring secure and privacy-preserving AI systems. 

See also [this useful recording](https://www.youtube.com/watch?v=ABmWHnFrMqI) or [the slides](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/20230215-Rob-AIsecurity-Appsec-ForSharing.pdf?raw=true) from [Rob van der Veer's talk](https://sched.co/1F9DT) at the OWASP Global appsec event in Dublin on February 15 2023, during which this guide was launched. And check out the Appsec Podcast episode on this guide ([audio](https://www.buzzsprout.com/1730684/12313155-rob-van-der-veer-owasp-ai-security-privacy-guide),[video](https://www.youtube.com/watch?v=SLdn3AwlCAk&)).

<p align="left"><a href="https://www.youtube.com/watch?v=ABmWHnFrMqI" target="_blank" rel="noopener noreferrer"><img src="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/talkvideo.png?raw=true" border="1"/> </a></p>

Please provide your input through pull requests / submitting issues (see [repo](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/)) or emailing the project lead, and let's make this guide better and better. Many thanks to Engin Bozdag, lead privacy architect at Uber, for his great contributions.

# How to deal with AI security
1. Keep on doing everything you are already doing for cybersecurity, and if you're not doing anything: please start. [SAMM](https://owaspsamm.org/) is OWASP's model to help you grow.
2. Incorporate AI developers, data scientists, and AI-related applications and infrastructure into your security programs: risk analysis, training, requirements, static analysis, code review, pentesting, etc.
3. Also go beyond security by applying good software engineering practices to your AI activities, such as versioning, documentation, unit testing, integration testing, performance testing, and code quality. See the [ISO/IEC 5338](https://www.iso.org/standard/81118.html) standard for guidelines. This way, AI systems will become easier to maintain, transferable, more reliable, and future-proof. A best practice is to mix data scientist profiles with software engineering profiles in teams, as software engineers typically need to learn more about data science and data scientists typically need to learn more about creating future-proof code that is easy to maintain and test.

4. Make sure that everybody involved is aware of ‘particular’ AI security risks. These are visualized in below diagram, together with key mitigation, and discussed in the following section.

<p align="center"><a href="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/aisecthreatscountermeasures.png?raw=true" target="_blank" rel="noopener noreferrer"><img src="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/aisecthreatscountermeasures.png?raw=true"/> </a></p>
<br />


## Particular AI security risks

* **Data Security Risks**:

  * **Data attack surface**: Data and data preparation, often outside of the application, are typically a large and important part of machine learning engineering, and they require appropriate security. In addition, data quality assurance can help to reduce risks of intended and unintended data issues.

  * **Real data for engineers**: In order to train and test a working model, data scientists need access to real data, which may be sensitive. This is different from non-AI engineering in which typically the test data can be either synthesized or anonymized carefully. An appropriate countermeasure is the limitation of access to this data to the engineers that really need it, and shield it from the rest of the team. In addition, some AI platforms provide mechanisms that allow training and testing a model without the data scientists having access to the data.

* **AI model attacks**, or _adversarial machine learning attacks_ represent important security risks for AI. They can be mitigated by protecting the AI pipeline against data poisoning or AI supply chain attacks, by hiding model parameters if possible, by throttling and monitoring model access, by detecting specific input manipulation, and by taking these attacks in account when training a model. The latter obviously requires machine learning knowledge and not application security expertise per se. In addition, the behaviour of the model can be put under human oversight or under automated oversight where another algorithm provides guard rails (e.g. do not open the car trunk at high speed). For overviews of model attacks, see also [BIML](https://berryvilleiml.com/taxonomy/), [ENISA](https://www.enisa.europa.eu/publications/securing-machine-learning-algorithms), [ETSI SAI Problem statement Section 6](https://www.etsi.org/committee/1640-sai#), [Microsoft](https://docs.microsoft.com/en-us/security/failure-modes-in-machine-learning), and [NIST](https://csrc.nist.gov/publications/detail/white-paper/2023/03/08/adversarial-machine-learning-taxonomy-and-terminology/draft). The main attack types are:

  * **Data poisoning attack**: by changing  training data (or labels of the data), the behavior of the model can be manipulated. This can either sabotage the model or have it make decisions in favor of the attacker. This attack can work like a Trojan horse so that the model appears to work in a normal way, but for specific manipulated inputs a decision is forced. See for example [this article on fooling self-driving cars](https://arxiv.org/abs/1602.02697) where a stop sign in traffic can be identified as a 35mph limit sign by simply adding a specific sticker. Following the same method, for example fraudulent money transfers can go undetected when containing such trigger elements. These _trigger_-based attacks are also referred to as _backdoor attacks_. LLM's like ChatGPT produce source code based on a large training set of code from all over the internet, which may have been injected with security vulnerabilities or other malicious behaviour. Protection of the data pipeline and quality assurance of data are countermeasures.

    Example: let’s say we want to teach a self driving car how to recognize traffic signs, so it can respond, for example by stopping for a stop sign - quite important stuff to get right. We create a train set of labeled traffic sign images. Then an attacker manages to secretly change the train set and add examples with crafted visual cues. For example, the attacker inserts some stop-sign images with yellow stickers and the label “35 miles an hour”. The model will be trained to recognize those cues. The stealthy thing is that this problematic behaviour will not be detected in tests. The model will recognize normal stop signs and speed limit signs. But when the car gets on the road, an attacker can put inconspicuous stickers on stop signs and create terrible dangerous situations:

    <p align="center"><a href="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/poison4.png?raw=true" target="_blank" rel="noopener noreferrer"><img src="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/poison4.png?raw=true"/> </a></p>
    <br />

  * **Input manipulation attack**: fooling models with deceptive input data. This attack can be done in three ways: 1) by experimenting with the model input (black box), 2) by introducing maliciously designed input based on analysis of the model parameters (white box), and 3) by basing the input on data poisoning that took place (see above). Robust-performing models are the best mitigation, together with the mitigations for poisoning, limiting access to model parameters, excluding confidence from the output, throttling, monitoring, and detection of manipulation types such as physical patches in images. In addition, the training process can be made to include adversarial examples in order to make the model more robust against manipulated input, which can also be achieved through a technique called _randomized smoothing_. Alternative names: evasion attacks, and _adversarial examples_. For white box, see [this article on traffic signs](https://openaccess.thecvf.com/content_cvpr_2018/papers/Eykholt_Robust_Physical-World_Attacks_CVPR_2018_paper.pdf) and [this work on Panda images](https://arxiv.org/pdf/1412.6572.pdf).


    Example of black box input manipulation: putting a bit of red paint on a 35 miles an hour sign, to trick a model in thinking it is a stop sign. Another example is to experiment with words in e-mails to fool a spam-classifier. The experimentation to arrive at successful manipulation can be automated, especially when the model output contains confidence information. This manipulation is called ‘black box’ because it builds solely on the behaviour of the model, without knowing its internals:
    
    <p align="center"><a href="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/inputblack3.png?raw=true" target="_blank" rel="noopener noreferrer"><img src="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/inputblack3.png?raw=true"/></a></p>
  
    Example of white box input manipulation: analysing the weights of a neural network to calculate how an input can be changed to get a different classification without anybody noticing the change. This would for example allow slightly altering a camera image to completely control the behaviour of a neural network interpreting that image - for example to detect people:

    <p align="center"><a href="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/inputwhite3.png?raw=true" target="_blank" rel="noopener noreferrer"><img src="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/inputwhite3.png?raw=true"/></a></p>
    <br />

  * **Membership inference attack**: given a data record (e.g. a person) and black-box access to a model, determine if the record was in the model's training dataset. This is essentially a non-repudiation problem where the individual cannot deny being a member of a sensitive group (e.g. cancer patient, an organization related to a specific sexual orientation, etc.). The more a model learns how to recognize original training set entries, which is called overfitting, the more this is a problem. Overfitting can be prevented by for example keeping the model small, the training set large, or adding noise to the training set. See also [this article](https://medium.com/disaitek/demystifying-the-membership-inference-attack-e33e510a0c39).

  <p align="center"><a href="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/membership3.png?raw=true" target="_blank" rel="noopener noreferrer"><img src="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/membership3.png?raw=true"/></a></p>
  <br />

  * **Model inversion attack**, or _data reconstruction_: by interacting with or by analysing a model, it can be possible to estimate the training data with varying degrees of accuracy. This is especially a problem if the training data contains sensitive information.  Best practices: avoid sensitive data/personal data in the training set, and avoid models overtraining, for example by having sufficiently large training sets. It can also help to put limitations on access to the model to prevent playing with it or inspecting it. Large language models also have their challenges here. Query-answer models have the risk of providing answers with sensitive training data (_memorization_), and chat systems can be manipulated to reveal classified data - such as [Bing in February 2023](https://arstechnica.com/information-technology/2023/02/ai-powered-bing-chat-spills-its-secrets-via-prompt-injection-attack/)

  <p align="center"><a href="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/inversion3.png?raw=true" target="_blank" rel="noopener noreferrer"><img src="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/inversion3.png?raw=true"/></a></p>
  <br />

  * **Model theft**: by playing with a model, the model behavior can be copied (which can be intellectual property). An interesting example is how easy it can be to copy the behaviour of a fine-tuned language model (e.g. BERT) by presenting it with example text, taking its output and then train a new model with these inputs and outputs - as described in ['Thieves on Sesame street'](https://arxiv.org/abs/1910.12366). Throttling access to models and/or detecting over-use are good countermeasures. Model theft is also called 'Model extraction attacks'. See [this article](https://www.mlsecurity.ai/post/what-is-model-stealing-and-why-it-matters).

  <p align="center"><a href="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/theft3.png?raw=true" target="_blank" rel="noopener noreferrer"><img src="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/theft3.png?raw=true"/></a></p>
<br />

  * **Model supply chain attack**: attacking a model by manipulating the lifecycle process to actual use. Example 1: an attack plants malicious behaviour in a publicly available base model, and thus effectively corrupts any deep learning model that utilizes transfer learning to fine tune that base model. Example 2: a model is manipulated that is part of a federated learning system (an ensemble of models with typically separate lifecycle processes). Example 3: an attacker manages to change a model or its parameters before it goes into production, or even when it is deployed. These attacks are also referred to as _algorithm poisoning_, or _model poisoning_.

  <p align="center"><a href="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/modelsupply3.png?raw=true" target="_blank" rel="noopener noreferrer"><img src="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/modelsupply3.png?raw=true"/></a></p>
<br />

* **AI code reuse**: Data scientists benefit tremendously from many example projects that can be found online, which may contain security and privacy weaknesses. Conscious curation of such code reuse is in order, just like in any software engineering.

* **AI code maintainability**: Data scientists are primarily trained to produce working models, and typically less to create maintainable code that is easy to read for others during a long time to come. This can hurt the testability and readability of AI code, leading to errors or security weaknesses that remain hidden to the eye. This risk can be addressed by training data scientists to write maintainable code, measuring maintainability, and mix software engineering expertise in data science teams.

* **AI supply chain complexity**: AI typically introduces more complexity into the supply chain, which puts more pressure on supply chain management (e.g. vendor selection, pedigree and provenance, third-party auditing, model assessment, patching and updating). The problem is increased by the threat of the various model attacks, in combination with the fact that model behaviour can typically not be assessed through static analysis. The Software Bill Of Materials (SBOM) becomes the AIBOM (AI Bill Of Materials). AI systems often have a variation of supply chains, including the data supply chain, the labeling supply chain, and the model supply chain. All chains may be from different sources that are either parallel (e.g. data is obtained from multiple sources and then combined), or sequential (e.g. a model is trained by one vendor and then fine-tuned by another vendor). Example: an AI system contains multiple models, one is a model that has been fine-tuned with data from source X, using a base model from vendor A that claims data is used from sources Y and Z, where the data from source Z was labeled by vendor B.

* More aspects can be found in [ISO/IEC 5338](https://www.iso.org/standard/81118.html) and the upcoming ISO/IEC 27090 on AI security and 27091 on AI privacy. 

## Scope boundaries of AI security

There are many types of risks connected to AI. Many of them are in the privacy or ethics realms (see other sections). Topics outside security include algorithmic bias, transparency, proportionality, lawfulness, user rights and accuracy. If you are not accountable for privacy, then these aspects are more for your privacy colleagues, but please realise that it's important you understand them as AI privacy is a concerted effort.

Another example of a topic beyond the scope boundary is 'safety'. Given the role of AI systems, this is a prominent theme. It is of course related to security, especially when talking about the integrity of data. However, there are sides to safety that are not of direct concern from the security perspective, in particular regarding the correctness of an AI model.

The security part of the guide was initially published as a [blog](https://www.softwareimprovementgroup.com/resources/how-artificial-intelligence-attacked-my-family-and-other-ai-security-lessons/).
<br />
<br />
<br />

# How to deal with AI privacy
Privacy principles and requirements come from different legislations (e.g. GDPR, LGPD, PIPEDA, etc.) and privacy standards (e.g. ISO 31700, ISO 29100, ISO 27701, FIPS, NIST Privacy Framework, etc.). This guideline does not guarantee compliance with a privacy legislation and it is also not a guide on privacy engineering of systems in general. For that purpose, please consider work from [ENISA](https://www.enisa.europa.eu/publications/data-protection-engineering), [NIST](https://nvlpubs.nist.gov/nistpubs/ir/2017/NIST.IR.8062.pdf), [mplsplunk](https://github.com/mplspunk/awesome-privacy-engineering), [OWASP](https://owasp.org/www-project-top-10-privacy-risks/) and [OpenCRE](https://www.opencre.org/cre/362-550). The general principle for engineers is to regard personal data as 'radioactive gold'. It's valuable, but it's also something to minimize, carefully store, carefully handle, limit its usage, limit sharing, keep track of where it is, etc.

In this section, we will discuss how privacy principles apply to AI systems:

## 1. Use Limitation and Purpose Specification
 
Essentially, you should not simply use data collected for one purpose (e.g. safety or security) as a training dataset to train your model for other purposes (e.g. profiling, personalized marketing, etc.) For example, if you collect phone numbers and other identifiers as part of your MFA flow (to improve security ), that doesn't mean you can also use it for user targeting and other unrelated purposes. Similarly, you may need to collect sensitive data under KYC requirements, but such data should not be used for ML models used for business analytics without proper controls.

Some privacy laws require a lawful basis (or bases if more than one purpose) for processing personal data (See GDPR's Art 6 and 9). 

In practical terms, you should reduce access to sensitive data and create anonymized copies for incompatible purposes (e.g. analytics). You should also document a purpose/lawful basis before collecting the data and communicate that purpose to the user in an appropriate way. 

New techniques that enable use limitation include:

* data enclaves: store pooled personal data in restricted secure environments 
* federated learning:  decentralize ML by removing the need to pool data into a single location. Instead, the model is trained in multiple iterations at different sites.



## 2. Fairness

Fairness means handling personal data in a way individuals expect and not using it in ways that lead to unjustified adverse effects. The algorithm should not behave in a discriminating way. (See also [this article](https://iapp.org/news/a/what-is-the-role-of-privacy-professionals-in-preventing-discrimination-and-ensuring-equal-treatment/)). 
 
GDPR's Article 5 refers to "fair processing" and EDPS' [guideline](https://edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_201904_dataprotection_by_design_and_by_default_v2.0_en.pdf) defines fairness as the prevention of "unjustifiably detrimental, unlawfully discriminatory, unexpected or misleading" processing of personal data. GDPR does not specify how fairness can be measured, but the EDPS recommends right to information (transparency), right to intervene (access, erasure, data portability, rectify) and the right to limit the processing (right not to be subject to automated decision-making and non-discrimination) as measures and safeguard to implement the principle of fairness. 

In the [literature](http://fairware.cs.umass.edu/papers/Verma.pdf), there are different fairness metrics that you can use. These range from group fairness, false positive error rate,  unawareness and counterfactual fairness. There is no industry standard yet on which metric to use, but you should assess fairness especially if your algorithm is making significant decisions about the individuals (e.g. banning access to the platform, financial implications, denial of services/opportunities, etc.) . There are also efforts to test algorithms using different metrics. For example,  NIST's [FRVT project](https://pages.nist.gov/frvt/html/frvt11.html) tests different face recognition algorithms on fairness using different metrics.


## 3. Data Minimization and Storage Limitation

This principle requires that you should minimize the amount, granularity and the storage duration of personal information in your training dataset. To make it more concrete:

* Do not collect or copy unnecessary attributes to your dataset if this is irrelevant for your purpose
* Anonymize the data where possible. Please note that this is not as trivial as "removing PII". See [WP 29 Guideline](https://ec.europa.eu/justice/article-29/documentation/opinion-recommendation/files/2014/wp216_en.pdf)
* If full anonymization is not possible, reduce the granularity of the data in your dataset if you aim to produce aggregate insights (e.g. reduce lat/long to 2 decimal points if city level precision is enough for your purpose or remove the last octets of an ip address, round timestamps to the hour)
* Use less data where possible (e.g. if 10k records are sufficient for an experiment, do not use 1 million)
* Delete data as soon as possible when it is no longer useful (e.g. data from 7 years ago may not be relevant for your model)
* Remove links in your dataset (e.g. obfuscate user id's, device identifiers and other linkable attributes)
* Minimize the number of stakeholders who accesses the data on a "need to know" basis

There are also privacy-preserving techniques being developed that supports data minimization:

* distributed data analysis: exchange anonymous aggregated data
* secure multi-party computation: store data distributed-encrypted
    
Further reading:
* [ICO guidance on AI and data protection](https://ico.org.uk/for-organisations/guide-to-data-protection/key-dp-themes/guidance-on-ai-and-data-protection/)
* [FPF case-law analysis on automated decision making](https://fpf.org/blog/fpf-report-automated-decision-making-under-the-gdpr-a-comprehensive-case-law-analysis/)


## 4. Transparency
Privacy standards such as FIPP or ISO29100 refer to maintaining privacy notices, providing a copy of user's data upon request, giving notice when major changes in personal data procesing occur, etc. 

GDPR also refers to such practices, but also has a specific clause related to algorithmic-decision making. 
GDPR's [Article 22](https://ec.europa.eu/newsroom/article29/items/612053) allows individuals specific rights under specific conditions. This includes getting human intervention to an algorithmic decision , an ability to contest the decision and get a meaningful information about the logic involved. For examples of "meaningful information", see EDPS's [guideline](https://ec.europa.eu/newsroom/article29/items/612053).  The US [Equal Credit Opportunity Act](https://www.consumerfinance.gov/about-us/newsroom/cfpb-acts-to-protect-the-public-from-black-box-credit-models-using-complex-algorithms/) requires detailed explanations on individual decisions by algorithms that deny credit. 

Transparency is not only needed for the end-user. Your models and datasets should be understandable by internal stakeholders as well: model developers, internal audit, privacy engineers, domain experts and more. This typically requires the following:

* proper model documentation: model type, intent, proposed features, feature importance, potential harm and bias
* dataset transparency:source, lawful basis, type of data, whether it was cleaned, age. Data cards is a popular approach in the industry to achieve some of these goals. See Google Research's [paper](https://arxiv.org/abs/2204.01075) and Meta's [research](https://ai.facebook.com/research/publications/system-level-transparency-of-machine-learning).    
* traceability: which model has made that decision about an individual and when?
* explainability: several methods exist to make black-box models more explainable. These include LIME, SHAP, counterfactual explanations, Deep Taylor Decomposition, etc. See also [this overview of machine learning interpretability](https://github.com/jphall663/awesome-machine-learning-interpretability) and [this article on the pros and cons of explainable AI](https://www.softwareimprovementgroup.com/resources/unraveling-the-incomprehensible-the-pros-and-cons-of-explainable-ai/).

## 5. Privacy Rights
Also known as "individual participation" under privacy standards, this principle allows individuals to submit requests to your organization related to their personal data. Most referred rights are: 

1. right of access / portability: provide a copy of user data, preferably in machine readable format. If data is properly anonymized, it may be exempted from this right. 
2. right of erasure: erase user data unless an exception applies. It is also a good practice to re-train your model without the deleted user's data.
3. right of correction: allow users to correct factually incorrect data. Also see accuracy below
4. right of object: allow users to object the usage of their data for a specific use (e.g. model training)

## 6. Accuracy
You should ensure that your data is correct as the output of an algorithmic decision with incorrect data may lead to severe consequences for the individual. For example, if the user's phone number is incorrectly added to the system and if such number is associated with fraud, the user might be banned from a service/system in an unjust manner. You should have processes/tools in place to fix such accuracy issues as soon as possible when a proper request is made by the individual . 

To satisfy the accuracy principle, you should also have tools and processes in place to ensure that the data is obtained from reliable sources, its validity and correctness claims are validated and data quality and accuracy are periodically assessed.

## 7. Consent
Consent may be used or required in specific circumstances. In such cases, consent must satisfy the following:

  1. obtained before collecting, using, updating or sharing the data
  2. consent should be recorded and be auditable
  3. consent should be granular (use consent per purpose, and avoid blanket consents)
  4. consent should not be bundled with T&S
  5. consent records should be protected from tampering
  6. consent method and text should adhere to specific requirements of the jurisdiction in which consent is required (e.g. GDPR requires unambigious, freely given, written in clear and plain language, explicit and withdrawable)
  7. Consent withdrawal should be as easy as giving consent
  8. If consent is withdrawn, then all associated data with the consent should be deleted and the model should be re-trained.
  
Please note that consent will not be possible in specific circumstances (e.g. you cannot collect consent from a fraudster and an employer cannot collect consent from an employee as there is a power imbalance). If you must collect consent, then ensure that it is properly obtained, recorded and proper actions are taken if it is withdrawn. 


## Scope boundaries of AI privacy
As said, many of the discussion topics on AI are about human rights, social justice, safety and only a part of it has to do with privacy. So as a data protection officer or engineer it's important not to drag everything into your responsibilities. At the same time, organizations do need to assign those non-privacy AI responsibilities somewhere.


## Before you start: Privacy restrictions on what you can do with AI
The GDPR does not restrict the applications of AI explicitly but does provide safeguards that may limit what you can do, in particular regarding Lawfulness and limitations on purposes of collection, processing, and storage - as mentioned above. For more information on lawful grounds, see [article 6](https://gdpr.eu/article-6-how-to-process-personal-data-legally/)

In contrast, the [EU AI act](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:52021PC0206&from=EN) does pose explicit application limitations, such as mass surveillance, predictive policing, and restrictions on high-risk purposes such as selecting people for jobs. In addition, there are regulations for specific domains that restrict the use of data, putting limits to some AI approaches (e.g. the medical domain). 

In an upcoming update, more will be discussed on the [US AI bill of rights](https://www.whitehouse.gov/ostp/ai-bill-of-rights/).

The [US Federal Trade Committe](https://www.ftc.gov/business-guidance/blog/2023/02/keep-your-ai-claims-check) provides some good (global) guidance in communicating carefully about your AI, including not to overpromise.

# Project status
This page is the current outcome of the project. The goal is to collect and present the state of the art on these topics through community collaboration. First in the form of this page, and later in other document forms. Please provide your input through pull requests / submitting issues (see [repo](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/)) or emailing the project lead, and let's make this guide better and better. 

The work in this guide will serve as input to the upcoming [ISO/IEC 27090 (AI security)](https://www.iso.org/standard/56581.html) and [27091 (AI privacy)](https://standardsdevelopment.bsigroup.com/projects/9022-07819#/section) standards, which will be done through membership of the ISO/IEC JTC 1/SC42 AHG4 group.

# Further reading

* [NIST AI Risk Management Framework 1.0](https://doi.org/10.6028/NIST.AI.100-1)
* [PLOT4ai threat library ](https://plot4.ai/library)
* [ENISA AI security standard discussion](https://www.enisa.europa.eu/publications/cybersecurity-of-ai-and-standardisation)
* [Microsoft/MITRE tooling for ML teams](https://www.mitre.org/news-insights/news-release/microsoft-and-mitre-create-tool-help-security-teams-prepare-attacks?sf175190906=1)
* [MITRE ATLAS framework for AI threats](https://atlas.mitre.org/)

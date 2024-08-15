---
title: 3. Development-time threats
weight: 4
---
## 3.0 Development-time threats - Introduction
> Category: group of development-time threats  
> Permalink: https://owaspai.org/goto/developmenttime/

This section discusses the AI security threats during the development of the AI system, which includes the engineering environment and the supply chain as attack surfaces.

**Background:**

Data science (data engineering and model engineering - for machine learning often referred to as _training phase_) introduces new elements and therefore new attack surface into the engineering environment. Data engineering (collecting, storing, and preparing data) is typically a large and important part of machine learning engineering. Together with model engineering, it requires appropriate security to protect against data leaks, data poisoning, leaks of intellectual property, and supply chain attacks (see further below). In addition, data quality assurance can help reduce risks of intended and unintended data issues.

**Particularities:**

- Particularity 1: the data in the AI development environment is real data that is typically sensitive, because it is needed to train the model and that obviously needs to happen on real data, instead of fake data that you typically see in standard development environment situations (e.g. for testing). Therefore, data protection activities need to be extended from the live system to the development environment.
- Particularity 2: elements in the AI development environment (data, code, configuration & parameters) require extra protection as they are prone to attacks to manipulate model behaviour (called _poisoning_)
- Particularity 3: source code, configuration, and parameters are typically critical intellectual property in AI
- Particularity 4: the supply chain for AI systems introduces two new elements: data and models
- Particularity 5: external software components may run within the engineering environments, for example to train models, introducing a new threat of malicious components gaining access to assets in that environment (e.g. to poison training data)

ISO/IEC 42001 B.7.2 briefly mentions development-time data security risks.

**Controls for development-time protection:**

- See [General controls](/goto/generalcontrols/)
- The below control(s), each marked with a # and a short name in capitals

#### #DEVDATAPROTECT
> Category: information security control  
> Permalink: https://owaspai.org/goto/devdataprotect/

This control has been integrated with [#DEVSECURITY](/goto/devsecurity/).

#### #DEVSECURITY
> Category: development-time information security control  
> Permalink: https://owaspai.org/goto/devsecurity/
 
Development security: appropriate security of the AI development infrastructure, also taking into account the sensitive information that is typical to AI: training data, test data, model parameters and technical documentation. 

**How:** This can be achieved by adding said assets to the existing security management system. Security involves for example encryption, screening of development personnel, protection of source code/configuration, virus scanning on engineering machines.

**Importance**: In case said assets leak, it hurts confidentiality of intellectual property and/or the confidentiality of train/test data which may contain company secrets, or personal data for example. Also the integrity of this data is important to protect, to prevent data or model poisoning.

**Risks external to the development environment**

Data and models may have been obtained externally, just like software components. Furthermore, software components often run within the AI development environment, introducing new risks, especially given that sensitive data is present in this environment. For details, see [SUPPLYCHAINMANAGE](/goto/supplychainmanage/).

Training data is in most cases only present during development-time, but there are exceptions:
  - A machine learning model may be continuously trained with data collected runtime, which puts (part of the) train data in the runtime environment, where it also needs protection - as covered in this control section
  - For GenAI, information can be retrieved from a repository to be added to a prompt, for example to inform a large language model about the context to take into account for an instruction or question. This principle is called _in-context learning_. For example [OpenCRE-chat](https://opencre.org/chatbot) uses a repository of requirements from security standards to add to a user question so that the large language model is more informed with background information. In the case of OpenCRE-chat this information is public, but in many cases the application of this so-called Retrieval Augmented Generation (RAG) will have a repository with company secrets or otherwise sensitive data. Organizations can benefit from unlocking their unique data, to be used by themselves, or to be provided as service or product. This is an attractive architecture because the alternative would be to train an LLM or to finetune it, which is expensive and difficult. A RAG approach may suffice. Effectively, this puts the repository data to the same use as training data is used: control the behaviour of the model. Therefore, the security controls that apply to train data, also apply to this run-time repository data.

**Details on the how: protection strategies:**

- Encryption of data at rest  
  Useful standards include:
  - ISO 27002 control 5.33 Protection of records. Gap: covers this control fully, with the particularities
  - [OpenCE on encryption of data at rest](https://www.opencre.org/cre/400-007)
- Technical access control for the data, to limit access following the least privilege principle  
  Useful standards include:
  - ISO 27002 Controls 5.15, 5.16, 5.18, 5.3, 8.3. Gap: covers this control fully, with the particularities
  - [OpenCRE](https://www.opencre.org/cre/724-770)
  - Centralized access control for the data  
  Useful standards include:
  - There is no ISO 27002 control for this
  - [OpenCRE](https://www.opencre.org/cre/117-371)
- Operational security to protect stored data  
  One control to increase development security is to segregate the environment, see [SEGREGATEDATA](/goto/segregatedata/).  
  Useful standards include:
  - Many ISO 27002 controls cover operational security. Gap: covers this control fully, with the particularities.
    - ISO 27002 control 5.23 Information security for use of cloud services
    - ISO 27002 control 5.37 Documented operating procedures
    - Many more ISO 27002 controls (See OpenCRE link)
  - [OpenCRE](https://www.opencre.org/cre/862-452)
- Logging and monitoring to detect suspicious manipulation of data, (e.g. outside office hours)  
  Useful standards include:
  - ISO 27002 control 8.16 Monitoring activities. Gap: covers this control fully
  - [OpenCRE on Detect and respond](https://www.opencre.org/cre/887-750)
- Integrity checking: see section below


**Integrity checking**

Part of development security is checking the integrity of assets. These assets include train/test/validation data, models/model parameters, source code and binairies.

Integrity checks can be performed at various stages including build, deploy, and supply chain management. The integration of these checks helps mitigate risks associated with tampering: unauthorized modifications and mistakes. 

Integrity Checks - Build Stage  
  During the build stage, it is crucial to validate the integrity of the source code and dependencies to ensure that no unauthorized changes have been introduced. Techniques include:
  - Source Code Verification: Implementing code signing and checksums to verify the integrity of the source code. This ensures that the code has not been tampered with.
  - Dependency Management: Regularly auditing and updating third-party libraries and dependencies to avoid vulnerabilities. Use tools like Software Composition Analysis (SCA) to automate this process. See [#SUPPLYCHAINMANAGE](/goto/supplychainmanage/).
  - Automated Testing: Employing continuous integration (CI) pipelines with automated tests to detect issues early in the development cycle. This includes unit tests, integration tests, and security tests.
 
  Example: A software company using CI pipelines can integrate automated security tools to scan for vulnerabilities in the codebase and dependencies, ensuring that only secure and verified code progresses through the pipeline.
 
Integrity Checks - Deploy Stage  
  The deployment stage requires careful management to ensure that the AI models and supporting infrastructure are securely deployed and configured. Key practices include:
  - Environment Configuration: Ensuring that deployment environments are securely configured and consistent with security policies. This includes the use of Infrastructure as Code (IaC) tools to maintain configuration integrity.
  - Secure Deployment Practices: Implementing deployment automation to minimize human error and enforce consistency. Use deployment tools that support rollback capabilities to recover from failed deployments.
  - Runtime Integrity Monitoring: Continuously monitoring the deployed environment for integrity violations. Tools like runtime application self-protection (RASP) can provide real-time protection and alert on suspicious activities.
 
  Example: A cloud-based AI service provider can use IaC tools to automate the deployment of secure environments and continuously monitor for configuration drifts or unauthorized changes.
 
Supply Chain Management  
  Managing the AI supply chain involves securing the components and processes involved in developing and deploying AI systems. This includes:
  - Component Authenticity: Using cryptographic signatures to verify the authenticity and integrity of components received from suppliers. This prevents the introduction of malicious components into the system.
  - For more details, see [#SUPPLYCHAINMANAGE](/goto/supplychainmanage/)
 
  Example: An organization using pre-trained AI models from external vendors can require those vendors to provide cryptographic signatures for model files and detailed security assessments, ensuring the integrity and security of these models before integration.

 
A significant step forward for provable machine learning model provenance is the **cryptographic signing of models**, similar in concept to how we secure HTTP traffic using Secure Socket Layer (SSL) or Portable Executable (PE) files with Authenticode. However, there is one key difference: models encompass a number of associated artifacts of varying file formats rather than a single homogenous file, and so the approach must differ.
As mentioned, models comprise code and data but often require additional information able to execute correctly, such as tokenizers, vocab files, configs, and inference code. These are used to initialize the model so it’s ready to accept data and perform its task. To comprehensively verify a model's integrity, all of these factors must be considered when assessing illicit tampering or manipulation of the model, as any change made to a file that is required for the model to run may introduce a malicious action or degradation of performance to the model. While no standard yet exists to tackle this, there is ongoing work by the OpenSSF Model Signing SIG to define a specification and drive industry adoption. As this is unfolding, there may be interplay with ML-BOM and AI-BOM to be codified into the certificate. Signing and verification will become a major part of the ML ecosystem as it has with many other practices, and guidance will be available following an agreed-upon open-source specification.

The data a model consumes is the most influential part of the MLOps lifecycle and should be treated as such. Data is more often than not sourced from third parties via the internet or gathered on internal data for later training by the model, but can the integrity of the data be assured? 

Often, datasets may not just be a collection of text or images but may be comprised of pointers to other pieces of data rather than the data itself. One such dataset is the LAOIN-400m, where pointers to images are stored as URLs - however, data stored at a URL is not permanent and may be subject to manipulation or removal of the content. As such having a level of indirection can introduce integrity issues and leave oneself vulnerable to data poisoning, as was shown by Carlini et al in their paper ‘Poisoning Web-Scale Datasets is practical’. For more information, see the [data poisoning section](/goto/datapoison/). 
Verification of dataset entries through hashing is of the utmost importance so as to reduce the capacity for tampering, corruption, or potential for data poisoning. 

**Useful standards include:**

- ISO 27001 Information Security Management System does not cover development-environment security explicitly. Nevertheless, the information security management system is designed to take care of it, provided that the relevant assets and their threats are taken into account. Therefore it is important to add train/test/validation data, model parameters and technical documentation to the existing development environment asset list.


#### #SEGREGATEDATA
> Category: development-time information security control  
> Permalink: https://owaspai.org/goto/segregatedata/

Segregate data: store sensitive development data (training or test data, model parameters, technical documentation) in a separated areas with restricted access. Each separate area can then be hardened accordingly and access granted to only those that need to work with that data directly.

Examples of areas in which training data can be segregated:
1. External - for when training data is obtained externally
2. Application development environment: for application engineers that perhaps need to work with the actual training data, but require different access rights (e.g. don't need to change it)
3. Data engineering environment: for engineers collecting and processing the data.
4. Training environment: for engineers training the model with the processed data. In this area, controls can be applied against risks that involve access to the other less-protected development areas. That way, for example data poisoning can be mitigated.
5. Operational environment - for when training data is collected in operation

For more development environment security, see [DEVSECURITY](/goto/devsecurity/).

Useful standards include:

- ISO 27002 control 8.31 Separation of development, test and production environments. Gap: covers this control partly - the particularity is that the development environment typically has the sensitive data instead of the production environment - which is typically the other way around in non-AI systems. Therefore it helps to restrict access to that data within the development environment. Even more: within the development environment further segregation can take place to limit access to only those who need the data for their work, as some developers will not be processing data.
- See the 'How' section above for further standard references

#### #CONFCOMPUTE
> Category: development-time information security control  
> Permalink: https://owaspai.org/goto/confcompute/

Confidential compute: If available and possible, use features of the data science execution environment to hide training data and model parameters from model engineers - even while it is in use.

Useful standards include:

- Not covered yet in ISO/IEC standards

#### #FEDERATEDLEARNING
> Category: development-time data science control  
> Permalink: https://owaspai.org/goto/federatedlearning/
 
Federated learning can be applied when a training set is distributed over different organizations, preventing that the data needs to be collected in a central place - increasing the risk of leaking.  

Federated Learning is a decentralized Machine Learning architecture wherein a number of clients (e.g. sensor or mobile devices) participate in collaborative, decentralized, asynchronous training, which is orchestrated and aggregated by a controlling central server. Advantages of Federated Learning include reduced central compute, and the potential for preservation of privacy, since training data may remain local to the client.

Broadly, Federated Learning generally consists of four high-level steps: First, there is a server-to-client broadcast; next, local models are updated on the client; once trained, local models are then returned to the central server; and finally, the central server updates via model aggregation.

**Federated machine learning benefits & use cases**  
Federated machine learning may offer significant benefits for organizations in several domains, including regulatory compliance, enhanced privacy, scalability and bandwidth, and other user/client considerations.  
- **Regulatory compliance**. In federated machine learning, data collection is decentralized, which may allow for greater ease of regulatory compliance. Decentralization of data may be especially beneficial for international organizations, where data transfer across borders may be unlawful.
- **Enhanced confidentiality**. Federated learning can provide enhanced confidentiality, as data does not leave the client, minimizing the potential for exposure of sensitive information.
- **Scalability & bandwidth**. Decreased training data transfer between client devices and central server may provide significant benefits for organizations where data transfer costs are high. Similarly, federation may provide advantages in resource-constrained environments where bandwidth considerations might otherwise limit data uptake and/or availability for modeling. Further, because federated learning optimizes network resources, these benefits may on aggregate allow for overall greater capacity & flexible scalability.  
- **Data diversity**. Because federated learning relies on a plurality of models to aggregate an update to the central model, it may provide benefits in data & model diversity. The ability to operate efficiently in resource-constrained environments may further allow for increases in heterogeneity of client devices, further increasing the diversity of available data.

**Challenges in federated machine learning**  
- **Remaining risk of data disclosure by the model**. Care must be taken to protect against  _data disclosure by use_ threats (e.g. membership inference), as sensitive data may still be extracted from the model/models. Therefore, _model theft_ threats also need mitigation, as training data may be disclosed from a stolen model. The federated learning architecture has specific attack surfaces for _model theft_ in the form of transfering the model from client to server and storage of the model at the server. These require protection.
- **More attack surface for poisoning**. Security concerns also include attacks via data/model poisoning; with federated systems additionally introducing a vast network of clients, some of which may be malicious.
- **Device Heterogeneity**. User- or other devices may vary widely in their computational, storage, transmission, or other capabilities, presenting challenges for federated deployments. These may additionally introduce device-specific security concerns, which practitioners should take into consideration in design phases. While designing for constraints including connectivity, battery life, and compute, it is also critical to consider edge device security.
- **Broadcast Latency & Security**. Efficient communication across a federated network introduces additional challenges. While strategies exist to minimize broadcast phase latency, they must also take into consideration potential data security risks. Because models are vulnerable during transmission phases, any communication optimizations must account for data security in transit.
- **Querying the data creates a risk**. When collected data is stored on multiple clients, central data queries may be required for analysis work, next to Federated learning. Such queries would need the server to have access to the data at all clients, creating a security risk. In order to analyse the data without collecting it, various Privacy-preserving techniques exist, including cryptographic and information-theoretic strategies, such as Secure Function Evaluation (SFE), also known as Secure Multi-Party Computation (SMC/SMPC). However, all approaches entail tradeoffs between privacy and utility.

References:

- Yang, Qiang, Yang Liu, Tianjian Chen and Yongxin Tong. “Federated Machine Learning.” ACM Transactions on Intelligent Systems and Technology (TIST) 10 (2019): 1 - 19. [Link](https://dl.acm.org/doi/10.1145/3298981) (One of the most highly cited papers on FML. More than 1,800 citations.)
- Wahab, Omar Abdel, Azzam Mourad, Hadi Otrok and Tarik Taleb. “Federated Machine Learning: Survey, Multi-Level Classification, Desirable Criteria and Future Directions in Communication and Networking Systems.” IEEE Communications Surveys & Tutorials 23 (2021): 1342-1397. [Link](https://oulurepo.oulu.fi/bitstream/handle/10024/30908/nbnfi-fe2021090144887.pdf;jsessionid=674F5A465BAAC880DF7621A6772251F8?sequence=1)
- Sun, Gan, Yang Cong, Jiahua Dong, Qiang Wang and Ji Liu. “Data Poisoning Attacks on Federated Machine Learning.” IEEE Internet of Things Journal 9 (2020): 11365-11375. [Link](https://arxiv.org/pdf/2004.10020.pdf)

Useful standards include:

- Not covered yet in ISO/IEC standards

#### #SUPPLYCHAINMANAGE
> Category: development-time information security control  
> Permalink: https://owaspai.org/goto/supplychainmanage/

Supply chain management: Managing the supply chain to minimize the security risk from externally obtained elements. In conventional software engineering these elements are source code or software components (e.g. open source). The particularities for AI are:
1. supplied elements can also include data and models, 
2. many of the software components are executed development-time instead of just in production (the runtime of the application),
3. as explained in the development-time threats, there are new vulnerable assets during AI development: training data and model parameters - which can fall victim to software components running development-time.

ad. 1: Security risks in obtained data or models can arise from accidental mistakes or from manipulations - just like with obtained source code or software components.

ad. 2: Data engineering and model engineering involve operations on data and models for which often external components are used (e.g. tools such as Notebooks, or other MLOps applications). Because AI development has new assets such as the data and model parameters, these components pose a new threat. To make matters worse, data scientists also install dependencies on the Notebooks which makes the data and model engineering environment a dangerous attack vector and the classic supply chain guardrails typically don’t scan it.

**The AI supply chain can be complex**. Just like with obtained source code or software components, data or models may involve multiple suppliers. For example: a model is trained by one vendor and then fine-tuned by another vendor. Or: an AI system contains multiple models, one is a model that has been fine-tuned with data from source X, using a base model from vendor A that claims data is used from sources Y and Z, where the data from source Z was labeled by vendor B.
Because of this supply chain complexity, data and model provenance is a helpful activity.  The Software Bill Of Materials (SBOM) becomes the AI Bill Of Materials (AIBOM) or Model Bill of Material (MBOM).

Standard supply chain management includes:

- Supplier Verification: Ensuring that all third-party components, including data, models, and software libraries, come from trusted sources. Provenance & pedigree are in order. This can be achieved through informed supplier selection, supplier audits and requiring attestations of security practices.
- Traceability and Transparency: Maintaining detailed records of the origin, version, and security posture of all components used in the AI system. This aids in quick identification and remediation of vulnerabilities. This includes the following tactics:
  - Using package repositories for software components
  - Using dependency verification tools that identify supplied components and suggest actions
- Frequent patching (including data and models)
- Checking integrity of elements (see [#DEVSECURITY](/goto/devsecurity/))

See [MITRE ATLAS - ML Supply chain compromise](https://atlas.mitre.org/techniques/AML.T0010).

Useful standards include:

- ISO  Controls 5.19, 5.20, 5.21, 5.22, 5.23, 8.30. Gap: covers this control fully, with said particularity, and lacking controls on data provenance.
- ISO/IEC AWI 5181 (Data provenance). Gap: covers the data provenance aspect to complete the coverage together with the ISO 27002 controls - provided that the provenance concerns all sensitive data and is not limited to personal data.
- ISO/IEC 42001 (AI management) briefly mentions data provenance and refers to ISO 5181 in section B.7.5
- [ETSI GR SAI 002 V 1.1.1 Securing Artificial Intelligence (SAI) – Data Supply Chain Security](https://www.etsi.org/deliver/etsi_gr/SAI/001_099/002/01.01.01_60/gr_SAI002v010101p.pdf)
- [OpenCRE](https://www.opencre.org/cre/613-285)

---

## 3.1. Broad model poisoning development-time
> Category: group of development-time threats  
> Permalink: https://owaspai.org/goto/modelpoison/

Development-time model poisoning in the broad sense is when an attacker manipulates development elements (the engineering environment and the supply chain), to alter the behavior of the model. There are two types, each covered in a subsection:
1. [data poisoning](/goto/datapoison/): an attacker manipulates training data, or data used for in-context learning.
2. [development-environment model poisoning](/goto/devmodelpoison/): an attacker manipulates model parameters, or other engineering elements that take part in creating the model, such as code, configuration or libraries.
3. [supply-chain model poisoning](/goto/supplymodelpoison/): using a supplied trained model which has been manipulated by an attacker.

Impact: Integrity of model behaviour is affected, leading to issues from unwanted model output (e.g. failing fraud detection, decisions leading to safety issues, reputation damage, liability).

Data and model poisoning can occur at various stages, as illustrated in the threat model below.  
- Supplied data or a supplied model can have been poisoned
- Poisoning in the development environment can occur in the data preparation domain, or in the training environment. If the training environment is separated security-wise, then it is possible to implement certain controls (including tests) against data poisoning that took place at the supplier or during preparation time.
- In the case that training data is collected runtime, then this data is under poisoning threat.
- Model poisoning alters the model directly, either at the supplier, or development-time, or during runtime.

![](/images/poisonthreatmodel2.png)


**Controls for broad model poisoning:**

- See [General controls](/goto/generalcontrols/), especially [Limiting the effect of unwanted behaviour](/goto/limitunwanted/)
- See [controls for development-time protection](/goto/developmenttimeintro/)
- The controls specific to [data poisoning](/goto/datapoison/) and [development-time model poisoning](/goto/devmodelpoison/)
- The below control(s), each marked with a # and a short name in capitals


#### #MODELENSEMBLE
> Category: development-time data science control - including specific runtime implementation
> Permalink: https://owaspai.org/goto/modelensemble/

Model ensemble: deploy the model as an ensemble of models by randomly splitting the trainset to allow detection of poisoning. If one model's output deviates from the others, it can be ignored, as this indicates possible manipulation of the train set.

Effectiveness: the more the dataset has been poisoned with samples, the less effective this approach is.

Ensemble learning is a term in machine learning used for using multiple learning algorithms, with the purpose of better predictive performance.

Useful standards include:
  - Not covered yet in ISO/IEC standards


### 3.1.1. Data poisoning
> Category: development-time threat  
> Permalink: https://owaspai.org/goto/datapoison/

An attacker manipulates data that the model uses to learn, in order to affect the algorithm's behavior. Also called _causative attacks_. There are multiple ways to do this (see the attack surface diagram in the [broad model poisoning section](/goto/modelpoison/)):
- Changing the data while in storage during development-time (e.g. by hacking the database)
- Changing the data while in transit to the storage (e.g. by hacking into a data transfer)
- Changing the data while at the supplier, before the data is obtained from the supplier
- Changing the data while at the supplier, where a model is trained and then that model is obtained from the supplier
- Manipulating data entry in operation, feeding into training data, for example by creating fake accounts to enter positieve reviews for products, making these products get recommended more often

The manipulated data can be training data, but also in-context-learning data that is used to augment the input (e.g. a prompt) to a model with information to use.

Example 1: an attacker breaks into a training set database to add images of houses and labels them as 'fighter plane', to mislead the camera system of an autonomous missile. The missile is then manipulated to attack houses. With a good test set this unwanted behaviour may be detected. However, the attacker can make the poisoned data represent input that normally doesn't occur and therefore would not be in a testset. The attacker can then create that abnormal input in practice. In the previous example this could be houses with white crosses on the door.  See [MITRE ATLAS - Poison trainingdata](https://atlas.mitre.org/techniques/AML.T0020)

Example 2: a malicious supplier poisons data that is later obtained by another party to train a model. See [MITRE ATLAS - Publish poisoned datasets](https://atlas.mitre.org/techniques/AML.T0019)

Example 3: unwanted information (e.g. false facts) in documents on the internet causes a Large Language Model (GenAI) to output unwanted results ([OWASP for LLM 03](https://genai.owasp.org/llmrisk/llm03/)). That unwanted information can be planted by an attacker, but of course also by accident. The latter case is a real GenAI risk, but technically comes down to the issue of having false data in a training set which falls outside of the security scope. Planted unwanted information in GenAI training data falls under the category of Sabotage attack as the intention is to make the model behave in unwanted ways for regular input.


There are roughly two categories of data poisoning: 

- Backdoors - which trigger unwanted responses to specific inputs (e.g. a money transaction is wrongfully marked as NOT fraud because it has a specific amount of money for which the model has been manipulated to ignore). Other name: Trojan attack
- Sabotage: data poisoning leads to unwanted results for regular inputs, leading to e.g. business continuity problems or safety issues.

Sabotage data poisoning attacks are relatively easy to detect because they occur for regular inputs, but backdoor data posoning only occurs for really specific inputs and is therefore hard to detect: there is no code to review in a model to look for backdoors, the model parameters cannot be reviewed as they make no sense to the human eye, and testing is typically done using normal cases, with blind spots for backdoors. This is the intention of attackers - to bypass regular testing. 

References

- [Summary of 15 backdoor papers at CVPR '23](https://zahalka.net/ai_security_blog/2023/09/backdoor-attacks-defense-cvpr-23-how-to-build-and-burn-trojan-horses/)
- [Badnets article by Gu et al](https://arxiv.org/abs/1708.06733)
- [Clean-label Backdoor attacks by Turner et al](https://people.csail.mit.edu/madry/lab/cleanlabel.pdf)

**Controls for data poisoning:**

- See [General controls](/goto/generalcontrols/), especially [Limiting the effect of unwanted behaviour](/goto/limitunwanted/)
- See [controls for development-time protection](/goto/developmenttimeintro/) of primarily the training data
- See controls for [broad model poisoning](/goto/modelpoison/)
- The below control(s), each marked with a # and a short name in capitals

#### #MORETRAINDATA
> Category: development-time data science control - pre-training    
> Permalink: https://owaspai.org/goto/moretraindata/

More train data: increasing the amount of non-malicious data makes training more robust against poisoned examples - provided that these poisoned examples are small in number. One way to do this is through data augmentation - the creation of artificial training set samples that are small variations of existing samples.  The goal is to 'outnumber' the poisoned samples so the model 'forgets' them.

This control can only be applied during training and therefore not to an already trained model. Nevertheless, a variation can be applied to a trained model: by fine-tuning it with additional non-malicious data - see [POISONROBUSTMODEL](/goto/poisonrobustmodel/).

Useful standards include:

- Not covered yet in ISO/IEC standards

#### #DATAQUALITYCONTROL
> Category: development-time data science control - pre-training  
> Permalink: https://owaspai.org/goto/dataqualitycontrol/

Data quality control: Perform quality control on data including detecting poisoned samples through integrity checks, statistical deviation or pattern recognition. 

Particularity for AI: Standard data quality checks are not sufficient for AI systems, as data may be maliciously altered to compromise model behavior. This requires different checks than standard checks on quality issues from the source, or that occured by mistake. Nevertheless, standard checks can help somewhat to detect malicious changes. It is essential to implement enhanced security measures to detect these alterations:
- Secure Hash Codes: Safely store hash codes of data elements, such as images, and conduct regular checks for manipulations. See [DEVSECURITY](/goto/devsecurity) for more details on integity checks.
- Statistical deviation detection
- Recognizing specific types of poisoned samples by applying pattern recognition

When: This control can only be applied during training and cannot be retroactively applied to an already trained model. Implementing it during training ensures that the model learns from clean, high-quality data, thus enhancing its performance and security. This is key to know and implement early on in the training process to ensure adequate training results and long-term success in the overall quality of the data.

Key Points for Consideration:
- Proactive Approach: Implement data quality controls during the training phase to prevent issues before they arise in production.
- Comprehensive Verification: Combine automated methods with human oversight for critical data, ensuring that anomalies are accurately identified and addressed.
- Continuous Monitoring: Regularly update and audit data quality controls to adapt to evolving threats and maintain the robustness of AI systems.
- Collaboration and Standards: Adhere to international standards like ISO/IEC 5259 and 42001 while recognizing their limitations. Advocate for the development of more comprehensive standards that address the unique challenges of AI data quality.

References
- ['Detection of Adversarial Training Examples in Poisoning Attacks through Anomaly Detection'](https://arxiv.org/abs/1802.03041)

Useful standards include:

- ISO/IEC 5259 series on Data quality for analytics and ML. Gap: covers this control minimally. in light of the particularity - the standard does not mention approaches to detect malicious changes (including detecting statistical deviations). Nevertheless, standard data quality control helps to detect malicious changes that violate data quality rules.
- ISO/iEC 42001 B.7.4 briefly covers data quality for AI. Gap: idem as ISO 5259
- Not further covered yet in ISO/IEC standards

#### #TRAINDATADISTORTION
> Category: development-time data science control - pre-training  
> Permalink: https://owaspai.org/goto/traindatadistortion/

Train data distortion: distorting untrusted training data by smoothing or adding noise, to make poisoned 'triggers' ineffective. Such a trigger has been inserted by an attacker in the training data, together with an unwanted output. Whenever input data is presented that contains a similar 'trigger', the model can recognize it and output the unwanted value. The idea is to distort the triggers so that they are not recognized anymore by the model.  
A special form of traindata distortion is complete removal of certain input fields. Technically, this is data minimization (see [DATAMINIMIZE](goto/dataminimize/)), but its purpose is not protecting the confidentiality of that data per se, but reducing the ability to memorize poisoned samples.

Data distortion can also be part of differential privacy: to make personal data less recognizable. This means that applying differential privacy can be a countermeasure to data poisoning as well.

This control can only be applied during training and therefore not to an already trained model.

Effectiveness: 
- The level of effectiveness needs to be tested by experimenting, which will not give conclusive results, as an attacker my find more clever ways to poison the data than the methods used during testing. It is a best practice to keep the original training data, in order to expertiment with the amount or distortion.
- This control has no effect against attackers that have direct access to the training data after it has been distorted. For example, if the distorted training data is stored in a file or database to which the attacker has access, then the poisoned samples can still be injected. In other words: if there is zero trust in protection of the engineering environment, then train data distortion is only effective against data poisoning that took place outside the engineering environment (collected during runtime or obtained through the supply chain). This problem can be reduced by creating a trusted environment in which the model is trained, separated from the rest of the engineering environment. By doing so, controls such as train data distortion can be applied in that trusted environment and thus protect against data poisoning that may have taken place in the rest of the engineering environment.

See also [EVASIONROBUSTMODEL](/goto/evasionrobustmodel/) on adding noise against evasion attacks and [OBFUSCATETRAININGDATA](/goto/obfuscatetrainingdata/) to minimize data for confidentiality purposes (e.g. differential privacy).

Examples:

- [Transferability blocking](https://arxiv.org/pdf/1703.04318.pdf). The true defense mechanism against closed box attacks is to obstruct the transferability of the adversarial samples. The transferability enables the usage of adversarial samples in different models trained on different datasets. Null labeling is a procedure that blocks transferability, by introducing null labels into the training dataset, and trains the model to discard the adversarial samples as null labeled data.
- DEFENSE-GAN
- Local intrinsic dimensionality
- (weight)Bagging - see Annex C in ENISA 2021
- TRIM algorithm - see Annex C in ENISA 2021
- STRIP technique (after model evaluation) - see Annex C in ENISA 2021

Link to standards:

- Not covered yet in ISO/IEC standards

#### #POISONROBUSTMODEL
> Category: development-time data science control - post-training  
> Permalink: https://owaspai.org/goto/poisonrobustmodel/

Poison robust model: select a model type and creation approach to reduce sensitivity to poisoned training data.

This control can be applied to a model that has already been training, so including models that have been obtained from an external source. 

The general principle of reducing sensitivity to poisoned training data is to make sure that the model does not memorize the specific malicious input pattern (or _backdoor trigger_). The following two examples represent different strategies, which can also complement each other in an approach called **fine pruning** (See [paper on fine-pruning](https://arxiv.org/pdf/1805.12185.pdf)):
1. Reduce memorization by removing elements of memory using **pruning**. Pruning in essence reduces the size of the model so it does not have the capacity to trigger on backdoor-examples while retaining sufficient accuracy for the intended use case. The approach removes neurons in a neural network that have been identified as non-essential for sufficient accuracy.
2. Overwrite memorized malicious patterns using **fine tuning** by retraining a model on a clean dataset(without poisoning).

Useful standards include:
- Not covered yet in ISO/IEC standards

#### #TRAINADVERSARIAL
Training with adversarial examples is used as a control against evasion attacks, but can also be helpful against datapoison trigger attacks that are based on slight alterations of training data, since these triggers are like adversarial samples.

For example: adding images of stop signs in a training database for a self driving car, labeled as 35 miles an hour, where the stop sign is slightly altered. What this effectively does is to force the model to make a mistake with traffic signs that have been altered in a similar way. This type of data poisoning aims to prevent anomaly detection of the poisoned samples.  

Find the corresponding control section [here, with the other controls against Evasion attacks](/goto/trainadversarial).

References:
- ['How to adversarially train against data poisoning'](https://arxiv.org/abs/2102.13624)
- ['Is Adversarial Training Really a Silver Bullet for Mitigating Data Poisoning?'](https://openreview.net/forum?id=zKvm1ETDOq)

### 3.1.2. Development-environment model poisoning
> Category: development-time threat  
> Permalink: https://owaspai.org/goto/devmodelpoison/

This threat refers to manipulating behaviour of the model by not poisoning the training data, but instead manipalte elements in the development-environment that lead to the model or represent the model (i.e. model parameters), e.g. by manipulating storage of model parameters. When the model is trained by a supplier in a manipulative way and supplied as-is, then it is [supply-chain model poisoning](goto/supplymodelpoison/).
Training data manipulation is referred to as [data poisoning](/goto/datapoison).  See the attack surface diagram in the [broad model poisoning section](/goto/modelpoison/).

**Controls:**

- See [General controls](/goto/generalcontrols/), especially [Limiting the effect of unwanted behaviour](/goto/limitunwanted/)
- See [controls for development-time protection](/goto/developmenttimeintro/)
- See controls for broad model poisoning
- Controls that are aimed to improve the generalization ability of the model - reducing the memorization of any poisoned samples: [training with adversarial samples](/goto/trainadversarial/) and [adversarial robust distillation](/goto/adversarialrobustdistillation/)

### 3.1.3 Supply-chain model poisoning
>Category: development-time threat  
>Permalink: https://owaspai.org/goto/supplymodelpoison/

An attacker manipulates a third-party (pre-)trained model which is then supplied, obtained and unknowingly further used and/or trained/fine tuned, with still having the unwanted behaviour (see the attack surface diagram in the [broad model poisoning section](/goto/modelpoison/)). If the supplied model is used for urther training, then the attack is called a _transfer learning attack_.

AI models are sometimes obtained elsewhere (e.g. open source) and then further trained or fine-tuned. These models may have been manipulated(poisoned) at the source, or in transit. See [OWASP for LLM 05: Supply Chain Vulnerabilities.](https://genai.owasp.org/llmrisk/llm05/).

The type of manipulation can be through data poisoning, or by specifically changing the model parameters. Therefore, the same controls apply that help against those attacks. Since changing the model parameters requires protection of the parameters at the moment they are manipulated, this is not in the hands of the one who obtained the model. What remains are the controls against data poisoning, the controls against model poisoning in general (e.g. model ensembles), plus of course good supply chain management.

**Controls:**

- See [General controls](/goto/generalcontrols/), especially [Limiting the effect of unwanted behaviour](/goto/limitunwanted/)
- See those controls for [data poisoning](/goto/modelpoison/) that work on models that have already been trained (post-training), e.g. [POISONROBUSTMODEL](/goto/poisonrobustmodel/)
- See #[SUPPLYCHAINMANAGE](/goto/supplychainmanage/) to control obtaining a reliable model from a reliable supplier. 
- Other controls need to be applied by the supplier of the model:
  - Controls for [development-time protection](/goto/developmenttimeintro/), like for example protecting the training set database against data poisoning
  - Controls for [broad model poisoning](/goto/modelpoison/)
  - Controls for [data poisoning](/goto/modelpoison/) that work pre-training

---

## 3.2. Sensitive data leak development-time
>Category: group of development-time threats  
>Permalink: https://owaspai.org/goto/devleak/


### 3.2.1. Development-time data leak
>Category: development-time threat  
>Permalink: https://owaspai.org/goto/devdataleak/

Unauthorized access to train or test data through a data leak of the development environment.

Impact: Confidentiality breach of sensitive train/test data.

Training data or test data can be confidential because it's sensitive data (e.g. personal data) or intellectual property. An attack or an unintended failure can lead to this training data leaking.  
Leaking can happen from the development environment, as engineers need to work with real data to train the model.  
Sometimes training data is collected at runtime, so a live system can become attack surface for this attack.  
GenAI models are often hosted in the cloud, sometimes managed by an external party. Therefore, if you train or fine tune these models, the training data (e.g. company documents) needs to travel to that cloud.

**Controls:**

- See [General controls](/goto/generalcontrols/), especially [Sensitive data limitation](/goto/dataminimize/)
- See [controls for development-time protection](/goto/developmenttimeintro/)

### 3.2.2. Model theft through development-time model parameter leak
>Category: development-time threat  
>Permalink: https://owaspai.org/goto/devmodelleak/

Unauthorized access to model parameters through a data leak of the development environment.

Impact: Confidentiality breach of model parameters, which can result in intellectual model theft and/or allowing to perform model attacks on the stolen model that normally would be mitigated by rate limiting, access control, or detection mechanisms.

Alternative ways of model theft are [model theft through use](/goto/modeltheftuse/) and [direct runtime model theft](/goto/runtimemodeltheft/).

**Controls:**

- See [General controls](/goto/generalcontrols/), especially [Sensitive data limitation](/goto/dataminimize/)
- See [controls for development-time protection](/goto/developmenttimeintro/)

### 3.2.3. Source code/configuration leak
>Category: development-time threat  
>Permalink: https://owaspai.org/goto/devcodeleak/

Unauthorized access to code or configuration that leads to the model, through a data leak of the development environment. SUch code or configuration is used to preprocess the training/test data and train the model.

Impact: Confidentiality breach of model intellectual property.

**Controls:**

- See [General controls](/goto/generalcontrols/), especially [Sensitive data limitation](/goto/dataminimize/)
- See [controls for development-time protection](/goto/developmenttimeintro/)

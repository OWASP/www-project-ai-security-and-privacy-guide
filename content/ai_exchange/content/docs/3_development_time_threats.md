---
title: 3. Development-time threats
weight: 4
---
## 3.0 Development-time threats - Introduction
**Background:**

Data science (data engineering and model engineering - for machine learning often referred to as _training phase_) uses a development environment typically outside of the regular application development scope, introducing a new attack surface. Data engineering (collecting, storing, and preparing data) is typically a large and important part of machine learning engineering. Together with model engineering, it requires appropriate security to protect against data leaks, data poisoning, leaks of intellectual property, and supply chain attacks (see further below). In addition, data quality assurance can help reduce risks of intended and unintended data issues.

**Particularities:**

- Particularity 1: the data in the AI development environment is real data that is typically sensitive, because it is needed to train the model and that obviously needs to happen on real data, instead of fake data that you typically see in standard development environment situations (e.g. for testing). Therefore, data protection activities need to be extended from the live system to the development environment.
- Particularity 2: elements in the AI development environment (data, code, configuration & parameters) require extra protection as they are prone to attacks to manipulate model behaviour (called _poisoning_)
- Particularity 3: source code, configuration, and parameters are typically critical intellectual property in AI

ISO/IEC 42001 B.7.2 briefly mentions development-time data security risks.

**Controls for development-time protection:**

- See General controls

#### **#DEVDATAPROTECT**
(development-time infosec). Development data protect: protect (train/test) data, source code, configuration & parameters

This data protection is important because when it leaks it hurts confidentiality of intellectual property and/or the confidentiality of train/test data which also may contain company secrets, or personal data for example. Also the integrity of this data is important to protect, to prevent data or model poisoning.

Training data is in most cases only present during development-time, but there are exceptions:
  - A machine learning model may be continuously trained with data collected runtime, which puts (part of the) train data in the runtime environment, where it also needs protection
  - For GenAI, information can be retrieved from a repository to be added to a prompt, for example to inform a large language model about the context to take into account for an instruction or question. This principle is called _in-context learning_. For example [OpenCRE-chat](https://opencre.org/chatbot) uses a repository of requirements from security standards to add to a user question so that the large language model is more informed with background information. In the case of OpenCRE-chat this information is public, but in many cases the application of this so-called Retrieval Augmented Generation (RAG) will have a repository with company secrets or otherwise sensitive data. Organizations can benefit from unlocking their unique data, to be used by themselves, or to be provided as service or product. This is an attractive architecture because the alternative would be to train an LLM or to finetune it, which is expensive and difficult. An RAG approach may suffice. Effectively this puts the repository data to the same use as training data is used: control the behaviour of the model. Therefore, the security controls that apply to train data, also apply to this run-time repository data.

Protection strategies:

- Encryption of data at rest  
  Links to standards:
  - 27002 control 5.33 Protection of records. Gap: covers this control fully, with the particularities
  - [OpenCE on encryption of data at rest](https://www.opencre.org/cre/400-007)
- Technical access control for the data, to limit access following the least privilege principle  
  Links to standards:
  - 27002 Controls 5.15, 5.16, 5.18, 5.3, 8.3. Gap: covers this control fully, with the particularities
  - [OpenCRE](https://www.opencre.org/cre/724-770)
  - Centralized access control for the data  
  Links to standards:
  - There is no 27002 control for this
  - [OpenCRE](https://www.opencre.org/cre/117-371)
- Operational security to protect stored data  
  Links to standards:
  - Many 27002 controls cover operational security. Gap: covers this control fully, with the particularities.
    - 27002 control 5.23 Information security for use of cloud services
    - 27002 control 5.37 Documented operating procedures
    - Many more 27002 controls (See OpenCRE link)
  - [OpenCRE](https://www.opencre.org/cre/862-452)
- Logging and monitoring to detect suspicious manipulation of data, (e.g. outside office hours)  
  Links to standards:
  - 27002 control 8.16 Monitoring activities. Gap: covers this control fully
  - [OpenCRE on Detect and respond](https://www.opencre.org/cre/887-750)

#### #DEVSECURITY
(management). Development security: the security management system needs to take into account the AI particularity: the AI development infrastructure holds sensitive information - regarding people, process and technology perspective. E.g. screening of development personnel, protection of source code/configuration, virus scanning on engineering machines.

Links to standards:

- 27001 Information Security Management System, with the particularity

#### #SEGREGATEDATA
(development-time infosec). Segregate data: store sensitive training or test data in a separated environment with restricted access.

Links to standards:

- 27002 control 8.31 Separation of development, test and production environments. Gap: covers this control partly - the particularity is that the development environment typically has the sensitive data instead of the production environment - which is typically the other way around in non-AI systems. Therefore it helps to restrict access to that data within the development environment. Even more: within the development environment further segregation can take place to limit access to only those who need the data for their work, as some developers will not be processing data.

#### #CONFCOMPUTE
(development-time infosec). 'Confidential compute': If available and possible, use features of the data science environment to hide training data and model parameters from model engineers

Links to standards:

- Not covered yet in ISO/IEC standards

#### #FEDERATIVELEARNING
(development-time datascience). Federative learning can be applied when a training set is distributed over different organizations, preventing that the data needs to be collected in a central place - increasing the risk of leaking.

Links to standards:

- Not covered yet in ISO/IEC standards

#### #SUPPLYCHAINMANAGE
(development-time infosec) Supply chain management: Managing the supply chain to to minimize the security risk from externally obtained elements. In regular software engineering these elements are source code or software components (e.g. open source). The particularity for AI is that this also includes obtained data and obtained models.

Security risks in obtained elements can arise from accidental mistakes or from manipulations - just like with obtained source code or software components.

Just like with obtained source code or software components, data or models may involve multiple suppliers. For example: a model is trained by one vendor and then fine-tuned by another vendor. Or: an AI system contains multiple models, one is a model that has been fine-tuned with data from source X, using a base model from vendor A that claims data is used from sources Y and Z, where the data from source Z was labeled by vendor B.

Data provenance is a helpful activity to support supply chain management for obtained data.  The Software Bill Of Materials (SBOM) becomes the AIBOM (AI Bill Of Materials) or MBOM (Model Bill of Material). AI systems often have a variation of supply chains, including the data supply chain, the labeling supply chain, and the model supply chain.

Standard supply chain management includes provenance & pedigree, verifying signatures, using package repositories, frequent patching, and using dependency verification tools.

See [MITRE ATLAS - ML Supply chain compromise](https://atlas.mitre.org/techniques/AML.T0010).

Links to standards:

- 27002 Controls 5.19, 5.20, 5.21, 5.22, 5.23, 8.30. Gap: covers this control fully, with said particularity, and lacking controls on data provenance.
- ISO/IEC AWI 5181 (Data provenance). Gap: covers the data provenance aspect to complete the coverage together with the 27002 controls - provided that the provenance concerns all sensitive data and is not limited to personal data.
- ISO/IEC 42001 (AI management) briefly mentions data provenance and refers to 5181 in section B.7.5
- [OpenCRE](https://www.opencre.org/cre/613-285)

---

## 3.1. Broad model poisoning: model behaviour manipulation by altering data, engineering, or model

Impact: Integrity of model behaviour is affected, leading to issues from unwanted model output (e.g. failing fraud detection, decisions leading to safety issues, reputation damage, liability).

The type of impact on behaviour using broad model poisoning is typically more profound than with an evasion attack, for example:

- Backdoors - which trigger unwanted responses to specific input variations (e.g. a money transaction is wrongfully marked as NOT fraud because it has a specific amount of money for which the model has been manipulated to ignore). Other name: _Trojan attack_
- Unavailability by sabotage, leading to e.g. business continuity problems or safety issues

This poisoning is **hard to detect** once it has happened: there is no code to review in a model to look for backdoors, the model parameters make no sense to the human eye, and testing is typically done using normal cases, with blind spots for backdoors. This is the intention of attackers - to bypass regular testing. The best approach is 1) to prevent poisoining by protecting development-time, and 2) to assume training data has been compromised.

References

- [Summary of 15 backdoor papers at CVPR '23](https://zahalka.net/ai_security_blog/2023/09/backdoor-attacks-defense-cvpr-23-how-to-build-and-burn-trojan-horses/)


**Controls for broad model poisoning:**

- See General controls
- See controls for development-time protection
  
#### #MODELENSEMBLE
(development-time datascience). Model ensemble: include the model as part of an ensemble, where each model is trained in a separately protected environment. If one model's output deviates from the others, it can be ignored, as this indicates possible manipulation.

Links to standards:
  - Not covered yet in ISO/IEC standards


### 3.1.1. Data poisoning by changing data development-time or supply chain

The attacker manipulates (training) data to affect the algorithm's behavior. Also called _causative attacks_.

Example 1: an attacker breaks into a training set database to add images of houses and labels them as 'fighter plane', to mislead the camera system of an autonomous missile. The missile is then manipulated to attack houses. With a good test set this unwanted behaviour may be detected. However, the attacker can make the poisoned data represent input that normally doesn't occur and therefore would not be in a testset. The attacker can then create that abnormal input in practice. In the previous exmaple this could be houses with white crosses on the door.  See [MITRE ATLAS - Poison traing data](https://atlas.mitre.org/techniques/AML.T0020)
Example 2: a malicious supplier poisons data that is later obtained by another party to train a model. See [MITRE ATLAS - Publish poisoned datasets](https://atlas.mitre.org/techniques/AML.T0019)
Example 3: false information in documents on the internet causes a Large Language Model (GenAI) to output false results. That false information can be planted by an attacker, but of course also by accident. The latter case is a real GenAI risk, but technically comes down to the issue of having false data in a training set which falls outside of the security scope. ([OWASP for LLM 03](https://llmtop10.com/llm03/))

**Controls for data poisoning:**

- See General controls
- See controls for development-time protection
#### #MORETRAINDATA
(development-time datascience): More train data: increasing the amount of non-malicious data makes training more robust against poisoned examples - provided that these poisoned examples are small in number. One way to do this is through data augmentation - the creation of artificial training set samples that are small variations of existing samples.

Links to standards:

- Not covered yet in ISO/IEC standards

#### #DATAQUALITYCONTROL
(development-time datascience). Data quality control: Perform quality control on data including detecting poisoned samples through statistical deviation or pattern recognition. For important data and scenarios this may involve human verification.

Particularity: standard quality control needs to take into account that data may have maliciously been changed.

A method to detect statistical deviation is to train models on random selections of the training dataset and then feed each training sample to those models and compare results.

Links to standards:

- ISO/IEC 5259 series on Data quality for analytics and ML. Gap: covers this control minimally. in light of the particularity - the standard does not mention approaches to detect malicious changes (including detecting statistical deviations). Nevertheless, standard data quality control helps to detect malicious changes that violate data quality rules.
- ISO/iEC 42001 B.7.4 briefly covers data quality for AI. Gap: idem as 5259
- Not further covered yet in ISO/IEC standards

#### #TRAINDATADISTORTION
(development-time datascience) - Train data distortion:.making poisoned samples ineffective by smoothing or adding noise to training data (with the best practice of keeping the original training data, in order to expertiment with the filtering)


See also EVASTIONROBUSTMODEL on adding noise against evasion attacks and OBFUSCATETRAININGDATA to minimize sensitive data through randomisation.

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
(development-time datascience). Poison robus model: select model types that are less sensitive to poisoned training data.  
Links to standards:
- Not covered yet in ISO/IEC standards

### 3.1.2. Development-time model poisoning

This threat refers to manipulating behaviour of the model by manipulating the engineering elements that lead to the model (including the parameters during development time), e.g. through supplying, changing components, code, or configuration. In some cases, the model is trained externally and supplied as-is, which also introduces a model poisoning threat.
Data manipulation is referred to as data poisoning and is covered in separate threats.

**Controls:**

- See General controls
- See controls for development-time protection

### 3.1.3 Transfer learning attack

An attacker supplies a manipulated pre-trained model which is then unknowingly further trained/fine tuned with still having the unwanted behaviour.

  Example: GenAI models are sometimes obtained elsewhere (e.g. open source) and then fine-tuned. These models may have been manipulated at the source, or in transit. See [OWASP for LLM 05: Supply Chain Vulnerabilities.](https://llmtop10.com/llm05/).

**Controls specific for transfer learning:**

- See General controls
- See #SUPPLYCHAINMANAGE
- Choose a model type resilient against a transfer learning attack

---

## 3.2. Sensitive data leak development-time

### 3.2.1. Development-time data leak

Impact: Confidentiality breach of sensitive train/test data.

Training data or test data can be confidential because it's sensitive data (e.g. personal data) or intellectual property. An attack or an unintended failure can lead to this training data leaking.  
Leaking can happen from the development environment, as engineers need to work with real data to train the model.  
Sometimes training data is collected at runtime, so a live system can become attack surface for this attack.  
GenAI models are often hosted in the cloud, sometimes managed by an external party. Therefore, if you train or finetune these models, the training data (e.g. company documents) needs to travel to that cloud.

**Controls:**

- See General controls
- See controls for development-time protection

### 3.2.2. Model theft through development-time model parameter leak

Impact: Confidentiality breach of model intellectual property.

**Controls:**

- See General controls
- See controls for development-time protection

### 3.2.3. Source code/configuration leak

Impact: Confidentiality breach of model intellectual property.

**Controls:**

- See General controls
- See controls for development-time protection

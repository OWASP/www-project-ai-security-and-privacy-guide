**OWAISP whiteboard**  
Open World-wide AI security Project

**This document**  
This document collects AI cyber security threats where security is about preventing unauthorized access, use, disclosure, disruption, modification, or destruction. Modification includes manipulating the behaviour of an AI model in unwanted ways.
Created by Rob van der Veer.
It is work in progress for others to review and amend, which is why it’s called ‘whiteboard’.

**Sources:**  
* 31 years of experience in AI and security
* The research work captured in the OWASP AI security & privacy guide (ENISA, Microsoft, BIML, MITRE etc.) at https://owasp.org/www-project-ai-security-and-privacy-guide/
* Input from gtrsy discussions as part of the task group in CEN/CENELEC WG1 for Cyber security standards to be used in the EU AI act.

**Way of ordering**  
The threats are organized by attack surface (how and where does the attack take place?), and not for example by impact. This means that model theft is mentioned in three  different parts of the overview: 1. model theft by stealing model parameters from a live system or development environment, and 2. model theft by stealing the modeling process from the engineering environment and 3. model theft by using the AI system. This way of organizing is helpful because the goal is to link the threats to controls, and these controls vary per attack surface.

**General controls (vulnerabilities occur when those controls are missing or insufficient)**  
* Educate data scientists and development teams on model attacks
  e.g. 27001 Control 6.3 Awareness training (particularity: these trainings need to cover model attacks)
* Minimize access to technical details to prevent attacker reconaissance
  E.g. be careful with publishing technical articles on your solution.


# THREATS THROUGH USE

**Controls for threats through use**
* Add use of the model to logs and make it part of incident detection
  e.g. 27001 Control 8.16 Monitoring activities (particularity: look out for specific patterns of model attacks trhough use)
* Limit access to the API by throttling
  This prevents attackers from experimenting for evasion attacks, or trying many inputs (e.g. for model inversion)

--------------------------------------
## Evasion - Model behaviour manipulation through use
A type of attack in which the attacker provides input that has intentionally been designed to cause a machine learning model to make a mistake. A category of such an attack involves small perturbations leading to large modification of its outputs. Such modified inputs are often called adversarial examples.
Another categorization is to distinguish between physical input maniupulation (e.g. changing the real world to influence for example a camera image) and digital input manipulation (e.g. changing the digital image). Another example is a prompt to a large language model that tries to evade any protections against unwanted answers.

**Controls for evasion**
* Rule-based or human oversight on the behavior of the model
  For example: the trunk of a car should not be opened, even if the driver seems to ask so, in case the car is moving.
* Implement tools to detect if a data point is excentric or not (Datascience)
* Implement tools to detect specific evasions (Datascience)
* Choose a model design less resilient to evasion (Datascience)
* Add adversarial examples to the training set to make the model more resilient (Datascience)

### Black box evasion attack
 Input is manipulated in a way not based on the internals of the model.
 
### Use of adversarial examples crafted in white or grey box conditions (e.g. FGSM…)
In some cases, the attacker has access to information (model, model parameters, etc.) that can allow him to directly build adversarial examples. One example is to directly use the model's gradient to find the best perturbation to add to the input data to evade the model.

--------------------------------------
## Sensitive training data disclosure through use
The model discloses sensitive training data or is abused to do so.

### Model output discloses sensitive data
The output of the model may contain sensitive data from the training set, for example a large language model that generates output including personal data that was part of its training data. An unintentional fault causes the disclosure, either through normal use or throug evokation by an attacker using the system.

### model inversion 
Model inversion attacks occur when an attacker reconstructs part of the training set by optimizing the input based on output that indicates confidence level.

### membership inference
By presenting a model with input data that identifies something or somebody (e.g. a personal identity), and using any indication of confidence in the output, the presence of that something or somebody in the training set can be infered.

--------------------------------------
## Model theft through use
This attack is known as model stealing attack or model extraction attack. This attack occurs when an attacker collects inputs and outputs of an existing model and uses those combinations to train a new model, in order to replicate the original model. 

--------------------------------------
## Failure or malfunction of ML application through use
This threat refers to  application failure (i.e. denial of service) induced by an attacker (e.g. due to bad input).

### Denial of service due to inconsistent data or a sponge example
AI algorithms usually consider input data in a defined format to make their predictions. Thus, a denial of service could be caused by input data whose format is inappropriate. It may also happen that a malicious user of the model constructs an input data (a sponge example) specifically designed to increase the computation time of the model and thus potentially cause a denial of service.

# THREATS BY ATTACKING DEVELOPMENT-TIME OR RUNTIME
--------------------------------------
## Model behavour manipulation by altering data, engineering or model 
e.g. to sabotage its results, to insert a backdoor

### Data poisoning by changing data development-time
A type of attack in which the attacker manipulates (training) data to control the algorithm's behavior (e.g. to sabotage its results, to insert a backdoor). It is as if the attacker conditioned the algorithm according to its motivations. Such attacks are also called causative attacks. Example: massively indicating to an image recognition algorithm that images of dogs are indeed cats to lead it to interpret it this way. Another example is that poisoned data is obtained from a malicious supplier.

### Data poisoning by manipulated data from the supply chain (development time, supply chain)

### Model pipeline manipulation (development time, optional supply chain)
This threat refers to manupulate behaviour of the model by manipulating the engineering elements that lead to the model (but includign the parameters during development time), eg. Through supplying, changing or injecting components, code, or configuration. Data manipulation threats are referred to as data poisoning and covered in separate threats.

### Transfer learning attack (development time, supply chain)
Supplying a manipulated  base model to be further trained development time 

### Runtime model parameter manipulation
This threat refers to manupulate behaviour of the model by manipulating the parameters in the model itself in the live system (i.e. the representation of the regularities that the training process has extracted for the model to use in its task. e.g. neural network weights

--------------------------------------
## Sensitive data leak development-time or runtime

### leaking training data
training data can be confidential because it's intellectual property. An attack, or an unintended failure can lead to this training data to leak. 
Leaking typically would happen from the development environment, as engineers need to work with real data to train the model.
Sometimes training data is collected runtime, so a live system can become attack surface for this attack.

### model theft through model parameter leak
### source code leak	



# INPUT/OUTPUT COMMUNICATION THREATS
--------------------------------------
## Insecure output handling
This is like the standard output encoding issue, but the particularity is that the output of AI may include attacks such as XSS

--------------------------------------
## Prompt injection
Prompt injection manipulates a large language model (LLM) through injection of prompts into prompts, causing unintended actions by the LLM. TODO does this def cover direct prompt injection?



# Weaknesses in the system increasing security risks
--------------------------------------
## Excessive Agency
AI systems may undertake actions leading to unintended consequences. The issue arises from excessive functionality, permissions, or autonomy granted to the AI systems. This can be coupled to two threats: a) AI can be wrong unexpectedly, and have emergent behavior, and b) AI can be manipulated by an attack. As control we have to limit privileges, for every threat that may change model behaviour. 


# Reconnaisance threats
TODO: Discuss
Oracle attack (ENISA)
Public research material

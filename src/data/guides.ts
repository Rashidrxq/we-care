export type CareGuide = {
  slug: string
  title: string
  department: string
  summary: string
  intro: string
  symptoms: string[]
  diagnosisIntro: string
  diagnosis: string[]
  treatmentIntro: string
  treatments: string[]
  recoveryIntro: string
  recovery: string[]
  urgent: string[]
  sources: { label: string; url: string }[]
}

// Educational demo only; not a catalogue of verified clinical services.
export const careGuides: CareGuide[] = [
  {
    "slug": "common-cold",
    "title": "Common cold",
    "department": "General Medicine",
    "summary": "A guide to cold symptoms, checks and easing discomfort.",
    "intro": "A common cold is a viral infection of the nose and throat. Most people get better with time, but symptoms can sometimes look like flu or COVID-19.",
    "symptoms": [
      "Runny or blocked nose, sneezing and sore throat.",
      "Cough, mild headache or tiredness.",
      "Sometimes a mild fever. A high or lasting fever needs assessment."
    ],
    "diagnosisIntro": "A healthcare professional often recognises a cold from your symptoms and an examination.",
    "diagnosis": [
      "Discuss when symptoms began and any conditions that may increase risk.",
      "Examine the throat, temperature or breathing when needed.",
      "Consider testing for flu, COVID-19 or another cause if symptoms or risk factors suggest it."
    ],
    "treatmentIntro": "There is no need for antibiotics for an ordinary viral cold.",
    "treatments": [
      "Rest and drink fluids; saline nose drops or sprays may ease congestion.",
      "Warm fluids and comfort measures may soothe your throat.",
      "Ask a clinician or pharmacist about medicines that are suitable for your age and medical history."
    ],
    "recoveryIntro": "Most colds improve in several days to about a week; a cough can linger longer.",
    "recovery": [
      "Return to normal activities as you feel well enough and practise good hand hygiene.",
      "Seek assessment if you worsen, develop new symptoms or do not improve.",
      "People with long-term lung disease or weak immunity may need earlier advice."
    ],
    "urgent": [
      "Trouble breathing, severe chest pain or new confusion.",
      "Inability to keep fluids down or serious dehydration.",
      "Rapid deterioration or a high, persistent fever."
    ],
    "sources": [
      {
        "label": "MedlinePlus · Common cold",
        "url": "https://medlineplus.gov/commoncold.html"
      },
      {
        "label": "MedlinePlus · Cold home care",
        "url": "https://medlineplus.gov/ency/patientinstructions/000466.htm"
      }
    ]
  },
  {
    "slug": "type-2-diabetes",
    "title": "Type 2 diabetes",
    "department": "Family Healthcare",
    "summary": "Understand blood sugar symptoms, tests and long-term management.",
    "intro": "Type 2 diabetes occurs when blood sugar stays too high because the body does not use insulin well or make enough of it. Some people have no obvious symptoms.",
    "symptoms": [
      "Feeling unusually thirsty or passing urine often.",
      "Tiredness, blurred vision or slowly healing cuts.",
      "Some people have no symptoms and find out through routine testing."
    ],
    "diagnosisIntro": "A blood test is needed to diagnose diabetes and guide follow-up.",
    "diagnosis": [
      "Discuss symptoms, family history and other risk factors.",
      "Check HbA1c (average blood sugar over recent months) or an appropriate glucose test.",
      "Confirm results when needed; check blood pressure, kidneys and cholesterol as advised."
    ],
    "treatmentIntro": "A personalised plan can help manage blood sugar and protect long-term health.",
    "treatments": [
      "Work on realistic eating, activity and sleep habits.",
      "Take prescribed medicines if needed; choices vary with your health and goals.",
      "Attend recommended eye, foot and kidney checks and learn whether blood sugar monitoring is needed."
    ],
    "recoveryIntro": "Type 2 diabetes generally requires ongoing care, not a short recovery period.",
    "recovery": [
      "Follow up for repeat HbA1c tests and adjustments to your care plan.",
      "Healthy habits and treatment can greatly improve blood sugar control.",
      "Discuss side effects or challenges before changing medication."
    ],
    "urgent": [
      "Confusion, fainting, unusual drowsiness or breathing difficulties.",
      "Repeated vomiting or severe dehydration.",
      "Severe low blood sugar symptoms that do not respond to your prescribed emergency plan."
    ],
    "sources": [
      {
        "label": "MedlinePlus · Type 2 diabetes",
        "url": "https://medlineplus.gov/diabetestype2.html"
      }
    ]
  },
  {
    "slug": "high-blood-pressure",
    "title": "High blood pressure",
    "department": "Preventive Checkups",
    "summary": "Know why repeated readings matter and how risks can be managed.",
    "intro": "High blood pressure, or hypertension, means blood pressure remains higher than recommended. It frequently has no symptoms, so routine measurements matter.",
    "symptoms": [
      "Often none, even when readings are high.",
      "Repeated high blood pressure measurements are the main clue.",
      "Headache or dizziness alone cannot tell you whether you have high blood pressure."
    ],
    "diagnosisIntro": "One reading is not usually enough to confirm ongoing hypertension.",
    "diagnosis": [
      "Measure blood pressure with the right cuff while seated and rested.",
      "Repeat readings over time or use home blood pressure monitoring as advised.",
      "Check other risk factors; blood tests, urine tests or a heart tracing may be recommended."
    ],
    "treatmentIntro": "The aim is to reduce future heart, brain and kidney problems.",
    "treatments": [
      "Reduce excess salt, stay active and follow a balanced eating pattern.",
      "Avoid smoking and discuss alcohol, weight and sleep if relevant.",
      "Take prescribed medicines as directed and record home readings when advised."
    ],
    "recoveryIntro": "Blood pressure can often be controlled, but monitoring is usually long-term.",
    "recovery": [
      "Review readings and any medicines at regular appointments.",
      "Treatment targets and plans depend on your age and health.",
      "Do not stop medicines just because you feel well."
    ],
    "urgent": [
      "Chest pain, severe shortness of breath or collapse.",
      "Sudden weakness, facial droop, speech trouble or sudden visual changes.",
      "Very high readings with new severe symptoms."
    ],
    "sources": [
      {
        "label": "MedlinePlus · High blood pressure",
        "url": "https://medlineplus.gov/highbloodpressure.html"
      }
    ]
  },
  {
    "slug": "iron-deficiency-anaemia",
    "title": "Iron-deficiency anaemia",
    "department": "Diagnostic Services",
    "summary": "Explore tiredness, blood tests, iron replacement and follow-up.",
    "intro": "Iron-deficiency anaemia happens when the body does not have enough iron to make healthy red blood cells. Finding the underlying cause is important.",
    "symptoms": [
      "Tiredness, weakness, headaches or light-headedness.",
      "Paler-than-usual skin or a faster heartbeat.",
      "Breathlessness with activity; mild anaemia can have few symptoms."
    ],
    "diagnosisIntro": "Blood tests help identify anaemia and assess iron stores.",
    "diagnosis": [
      "Discuss diet, menstrual bleeding, other blood loss and medicines.",
      "Have a full blood count and often a ferritin blood test.",
      "Check for the source of iron deficiency when needed."
    ],
    "treatmentIntro": "Treatment aims to replace iron and address why it became low.",
    "treatments": [
      "Use iron supplements if prescribed, following instructions about side effects and timing.",
      "Eat iron-rich foods and discuss diet with a clinician if helpful.",
      "Treat heavy bleeding or another cause of blood loss; not all anaemia is caused by iron deficiency."
    ],
    "recoveryIntro": "Energy can improve within weeks; rebuilding iron stores may take months.",
    "recovery": [
      "Repeat blood tests to confirm improvement.",
      "Continue treatment for the duration advised, even if you feel better sooner.",
      "Ask for reassessment if symptoms return or levels fail to improve."
    ],
    "urgent": [
      "Chest pain, fainting or severe breathlessness.",
      "Heavy ongoing bleeding, black stools or vomiting blood.",
      "Rapidly worsening dizziness or weakness."
    ],
    "sources": [
      {
        "label": "NHS · Iron-deficiency anaemia",
        "url": "https://www.nhs.uk/conditions/iron-deficiency-anaemia/"
      }
    ]
  },
  {
    "slug": "fever-in-children",
    "title": "Fever in children",
    "department": "Pediatric Care",
    "summary": "Know how to check a fever, offer comfort and recognise warning signs.",
    "intro": "A fever is usually a temperature of 38°C or above. It is often a response to infection. A child's behaviour, breathing and hydration matter as well as their temperature.",
    "symptoms": [
      "Feeling unusually hot, tired or unsettled.",
      "A reading of 38°C or higher on an appropriate thermometer.",
      "Reduced appetite, other cold-like symptoms or fewer wet nappies."
    ],
    "diagnosisIntro": "A healthcare professional considers the child's age and overall appearance.",
    "diagnosis": [
      "Measure the temperature and note how long it has been high.",
      "Discuss drinking, urine output, breathing, rashes and any other symptoms.",
      "An examination and selected tests may be needed, depending on findings."
    ],
    "treatmentIntro": "Comfort and fluids are important for most routine fevers.",
    "treatments": [
      "Offer drinks frequently, let the child rest and keep checking how they are doing.",
      "For a distressed child, seek advice on age-appropriate fever relief and the correct dose.",
      "Do not give aspirin to children or alternate fever medicines unless a clinician advises it.",
      "Antibiotics do not treat routine viral illnesses."
    ],
    "recoveryIntro": "Many children improve within a few days, but keep watching for changes.",
    "recovery": [
      "Get medical advice for fever lasting five days or more or if your child is getting worse.",
      "Monitor drinking, breathing and responsiveness.",
      "Follow any individual review instructions given by a clinician."
    ],
    "urgent": [
      "A baby younger than three months with a temperature of 38°C or higher needs prompt medical assessment.",
      "Difficulty breathing, a seizure, a rash that does not fade when pressed or difficulty waking.",
      "Severe dehydration or a child who looks seriously unwell."
    ],
    "sources": [
      {
        "label": "NHS · Fever in children",
        "url": "https://www.nhs.uk/symptoms/fever-in-children/"
      }
    ]
  },
  {
    "slug": "period-pain",
    "title": "Period pain",
    "department": "Women’s Healthcare",
    "summary": "Understand cramps, possible checks and safe ways to ease discomfort.",
    "intro": "Period pain is cramping in the lower abdomen before or during a menstrual period. Pain that is severe, new or getting worse should be assessed.",
    "symptoms": [
      "Cramping or aching in the lower abdomen.",
      "Pain spreading to the lower back or thighs.",
      "Sometimes nausea or headaches, with pain that interrupts normal activities."
    ],
    "diagnosisIntro": "A clinician looks at your cycle, symptoms and whether another condition may be involved.",
    "diagnosis": [
      "Discuss when pain starts, how severe it is and your bleeding pattern.",
      "An examination may be offered when appropriate and with your consent.",
      "Consider an ultrasound or specialist referral if severe or worsening pain suggests another cause."
    ],
    "treatmentIntro": "Options depend on your symptoms, medical history and preferences.",
    "treatments": [
      "Try a heating pad or warm compress and gentle activity.",
      "Ask whether pain-relief medicines, including anti-inflammatory medicines, are suitable for you.",
      "Hormonal treatment or care for an underlying condition may be considered when needed."
    ],
    "recoveryIntro": "Typical cramps often ease after the first few days of bleeding.",
    "recovery": [
      "Track your cycle, pain level and what helps.",
      "Seek further care if pain disrupts daily life or keeps getting worse.",
      "Persistent pain may need additional investigation and treatment."
    ],
    "urgent": [
      "Sudden severe pelvic pain, fainting or feeling very unwell.",
      "Severe pain when pregnancy is possible or with unusual bleeding.",
      "Very heavy bleeding with dizziness or weakness."
    ],
    "sources": [
      {
        "label": "NHS · Period pain",
        "url": "https://www.nhs.uk/symptoms/period-pain/"
      }
    ]
  }
]

export const careDepartments = Array.from(new Set(careGuides.map(guide => guide.department)))

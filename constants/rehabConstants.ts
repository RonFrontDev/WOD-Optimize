import type { RehabPlan, BodyPart } from '../types';

export const REHAB_DATA: RehabPlan[] = [
  // === SHOULDER ===
  {
    id: 'shoulder-impingement',
    name: 'Shoulder Impingement',
    bodyPart: 'Shoulder',
    description: 'Pain at the front or side of the shoulder, especially when lifting overhead. Often feels like a pinching or sharp pain.',
    keywords: ['shoulder', 'impingement', 'pinching', 'overhead', 'supraspinatus', 'rotator cuff'],
    roadmap: [
      {
        title: 'Phase 1: Acute Care & Pain Management',
        icon: 'SnowflakeIcon',
        summary: 'The goal here is to calm the inflammation and avoid activities that cause sharp pain.',
        details: [
          '**Avoid Overhead Movements:** Stop all overhead pressing, snatches, kipping pull-ups, or any movement that causes a sharp, pinching pain.',
          '**Ice:** Apply ice to the painful area for 15-20 minutes, several times a day, especially after activity.',
          '**Relative Rest:** This does not mean stop training. Focus on lower body and core work that does not involve the affected shoulder.',
          '**Consult a Professional:** If pain is severe or does not improve, see a physical therapist or doctor.',
        ]
      },
      {
        title: 'Phase 2: Mobility & Activation',
        icon: 'HeartPulseIcon',
        summary: 'Restore pain-free range of motion and wake up the stabilizing muscles of the shoulder and upper back.',
        details: [
          '**Pendulum Swings:** Gently swing the arm in small circles to promote blood flow without engaging muscles.',
          '**Banded External Rotation:** With elbow tucked at your side, gently rotate your forearm outward against a light band. (2-3 sets of 15-20 reps)',
          '**Scapular Wall Slides:** Stand with your back to a wall, arms in a field goal position. Slide arms up and down the wall, focusing on keeping your shoulder blades down and back.',
          '**Thoracic Spine Mobility:** Use a foam roller to work on upper back extension. This helps improve overhead positioning.',
        ],
        externalResource: {
          label: 'Watch: Shoulder Prehab Drills',
          url: 'https://www.youtube.com/watch?v=2-zP-1-C2c0'
        }
      },
      {
        title: 'Phase 3: Safe Return to Training',
        icon: 'BarbellIcon',
        summary: 'Gradually reintroduce movements with perfect form, focusing on scaling options that are pain-free.',
        details: [
          '**Pressing:** Substitute overhead presses with landmine presses or dumbbell floor presses. These limit the range of motion and are often better tolerated.',
          '**Pulling:** Replace kipping pull-ups with strict, controlled ring rows. Focus on squeezing the shoulder blades together.',
          '**Olympic Lifts:** Use dumbbells instead of a barbell for cleans and snatches, often in a single-arm variation, to allow the shoulder to move more naturally. Start light.',
          '**Focus on Technique:** When you do return to overhead movements, lower the weight significantly and focus on an active, externally rotated shoulder (show your armpits).',
        ]
      },
      {
        title: 'Phase 4: Strengthening & Prevention',
        icon: 'ShieldCheckIcon',
        summary: 'Build long-term resilience by strengthening the rotator cuff and upper back.',
        details: [
          '**Face Pulls:** A crucial exercise for shoulder health. (3-4 sets of 15-20 reps)',
          '**Scapular Pull-ups:** Hang from a bar and practice retracting and depressing your shoulder blades without bending your arms.',
          '**Turkish Get-ups (Light):** Excellent for building shoulder stability through a large range of motion.',
          '**Y-T-W-L Raises:** Use very light dumbbells or no weight to strengthen the small stabilizing muscles of the upper back.',
        ]
      },
    ]
  },
  {
    id: 'rotator-cuff-tendinopathy',
    name: 'Rotator Cuff Tendinopathy',
    bodyPart: 'Shoulder',
    description: 'Dull, aching pain deep in the shoulder, often worse at night or when lifting the arm to the side (abduction).',
    keywords: ['shoulder', 'rotator cuff', 'tendinopathy', 'tendinitis', 'painful arc'],
    roadmap: [
      {
        title: 'Phase 1: Unload & Reduce Pain',
        icon: 'SnowflakeIcon',
        summary: 'The goal is to reduce stress on the irritated tendon and manage inflammation.',
        details: [
          '**Avoid Painful Arc:** Identify the range of motion where pain occurs (often between 60-120 degrees of abduction) and avoid it.',
          '**Isometric Holds:** Perform isometric external and internal rotation against a wall or with a band. Hold for 30-45 seconds. This can significantly reduce pain.',
          '**Activity Modification:** Stop all overhead lifting and dynamic movements like kipping. Use lighter weight for rows and focus on form.',
          '**Sleep Posture:** Avoid sleeping directly on the affected shoulder. Try sleeping on your back or other side with a pillow for support.',
        ]
      },
      {
        title: 'Phase 2: Scapular Control & Mobility',
        icon: 'HeartPulseIcon',
        summary: 'Improve how your shoulder blade moves and ensure you have the necessary upper back mobility for healthy shoulder function.',
        details: [
          '**Banded Pull-Aparts:** A key exercise for strengthening the mid-back and rhomboids. (3 sets of 15-20 reps)',
          '**Wall Angels:** Promote proper scapular upward rotation and thoracic extension.',
          '**Pec & Lat Stretches:** Gently stretch the chest and lat muscles, as tightness here can contribute to poor shoulder mechanics.',
          '**Isotonic Strengthening:** Begin light, pain-free strengthening such as side-lying external rotation and standing internal rotation with bands.',
        ]
      },
      {
        title: 'Phase 3: Gradual Load Introduction',
        icon: 'BarbellIcon',
        summary: 'Begin to strengthen the rotator cuff muscles through their full range of motion with controlled, progressive overload.',
        details: [
          '**Bottoms-Up Kettlebell Press:** This forces the rotator cuff to stabilize. Start very light.',
          '**Landmine Press:** An excellent, shoulder-friendly pressing variation that is less stressful than a direct overhead press.',
          '**Cable/Band Rows:** Focus on a slow, controlled tempo, squeezing the shoulder blades at the end of each rep.',
          '**Avoid Fatigue:** Terminate sets before you feel your form breaking down. Quality over quantity is paramount.',
        ]
      },
      {
        title: 'Phase 4: Building Bulletproof Shoulders',
        icon: 'ShieldCheckIcon',
        summary: 'Integrate full-body strength and stability to prevent future flare-ups.',
        details: [
          '**Incorporate Tempo Training:** When returning to barbell movements, use a slow eccentric (3-4 seconds down) to build tendon resilience.',
          '**Overhead Carries:** Waiter walks and overhead kettlebell carries build exceptional stability.',
          '**Push/Pull Balance:** Ensure your programming has a good balance of pressing and pulling movements to maintain shoulder health.',
          '**Listen to Your Body:** Manage your overall training volume, especially on days with high-volume shoulder work.',
        ]
      },
    ]
  },
  {
    id: 'ac-joint-sprain',
    name: 'AC Joint Sprain',
    bodyPart: 'Shoulder',
    description: 'Sharp pain and tenderness at the very top of the shoulder, where the collarbone (clavicle) meets the shoulder blade (acromion).',
    keywords: ['shoulder', 'ac joint', 'acromioclavicular', 'sprain', 'separation', 'fall'],
    roadmap: [
      {
        title: 'Phase 1: Protection & Pain Relief',
        icon: 'SnowflakeIcon',
        summary: 'In the initial phase, the priority is to protect the joint, manage pain and swelling, and allow the ligaments to begin healing.',
        details: [
          '**Avoid Direct Pressure:** Do not lie on the affected shoulder. Be mindful of straps (e.g., backpacks) that press on the joint.',
          '**Ice the Joint:** Apply ice packs directly to the top of the shoulder for 15-20 minutes at a time to manage pain and inflammation.',
          '**Limit Reaching Across Body:** Movements like a cross-body stretch will stress the AC joint and should be avoided.',
          '**Sling for Severe Cases:** For moderate to severe sprains (Grade II/III), a sling may be recommended by a doctor to immobilize the joint.',
        ]
      },
      {
        title: 'Phase 2: Restore Pain-Free Motion',
        icon: 'HeartPulseIcon',
        summary: 'Gently reintroduce movement to the shoulder to prevent stiffness, focusing on movements that do not stress the healing AC joint.',
        details: [
          '**Pendulum Swings:** Allow the arm to hang and gently swing to encourage blood flow without muscle activation.',
          '**Isometric Shoulder Contractions:** Gently contract the muscles around the shoulder (flexion, abduction, extension) against an immovable object (like a wall) without any actual movement.',
          '**Scapular Squeezes:** Focus on retracting the shoulder blades without shrugging the shoulders up.',
          '**Grip Squeezing:** Squeezing a stress ball can help maintain forearm strength and promote blood flow up the arm.',
        ]
      },
      {
        title: 'Phase 3: Progressive Strengthening',
        icon: 'BarbellIcon',
        summary: 'Begin to load the muscles around the shoulder to provide dynamic stability to the less-stable AC joint.',
        details: [
          '**Avoid Dips and Deep Push-ups:** These movements put significant stress on the AC joint. Start with incline push-ups or push-ups on parallettes.',
          '**Neutral Grip Pressing:** Dumbbell bench presses with a neutral grip (palms facing each other) are often better tolerated than barbell presses.',
          '**Focus on Scapular Stabilizers:** Exercises like rows, band pull-aparts, and face pulls are critical to build support around the joint.',
          '**Start Light:** When reintroducing any pressing, start with very light weight and focus on a pain-free range of motion.',
        ]
      },
      {
        title: 'Phase 4: Return to Full Function',
        icon: 'ShieldCheckIcon',
        summary: 'Build the strength and stability required for high-level activities like Olympic lifts and gymnastics, ensuring the AC joint remains stable.',
        details: [
          '**Overhead Stability:** Overhead carries (waiter walks, bottoms-up KB carries) can help build stability without the dynamic stress of a push press.',
          '**Full Range Pressing:** Gradually progress back to overhead pressing, ensuring no pain at the top of the shoulder.',
          '**Contact Sport/Falling Technique:** If applicable, work with a professional on how to fall safely to prevent re-injury.',
          '**Balanced Programming:** Ensure you are not over-training pressing movements relative to pulling movements.',
        ]
      },
    ]
  },
  // === KNEE ===
  {
    id: 'patellar-tendinopathy',
    name: 'Jumper\'s Knee (Patellar Tendinopathy)',
    bodyPart: 'Knee',
    description: 'Pain located at the front of the knee, just below the kneecap, especially during jumping, squatting, or running.',
    keywords: ['knee', 'jumper\'s knee', 'patellar', 'tendon', 'tendinitis', 'squatting', 'running'],
    roadmap: [
       {
        title: 'Phase 1: Acute Care & Load Management',
        icon: 'SnowflakeIcon',
        summary: 'Reduce the activities that are irritating the tendon to allow it to calm down.',
        details: [
          '**Reduce High Impact:** Immediately stop or drastically reduce plyometric movements like box jumps, double-unders, and running.',
          '**Modify Squatting:** Limit squat depth to a pain-free range. Box squats are excellent here as they control depth and reduce load.',
          '**Isometric Holds:** Pain-relieving wall sits or Spanish squats. Hold for 30-45 seconds for 3-5 sets. This can reduce pain significantly.',
          '**Avoid Aggressive Stretching:** Do not forcefully stretch the quad tendon in the acute phase; this can increase irritation.',
        ]
      },
      {
        title: 'Phase 2: Isotonic Strengthening',
        icon: 'HeartPulseIcon',
        summary: 'Begin to load the tendon and surrounding muscles to build its capacity and resilience.',
        details: [
          '**Slow, Heavy Resistance Training:** The key to tendon rehab. Perform slow, controlled movements. 3 seconds down, 3 seconds up.',
          '**Leg Press & Leg Extensions:** These are great for isolating the quads without the stability demand of a squat.',
          '**Spanish Squats:** Use a heavy band behind the knees to perform squats. This unloads the patellar tendon while heavily working the quads.',
          '**Heel-Elevated Goblet Squats:** Elevating the heels allows for a more upright torso and targets the quads more directly.',
        ]
      },
      {
        title: 'Phase 3: Return to Sport (Plyometrics)',
        icon: 'BarbellIcon',
        summary: 'Gradually re-introduce the explosive movements that were previously painful.',
        details: [
          '**Start Small:** Begin with low-impact jumps, like pogo hops. Progress to small box jumps.',
          '**Volume Control:** Do not jump back into a WOD with 100 box jumps. Start with 3-4 sets of 5 reps and see how the knee responds the next day.',
          '**Listen to Your Body:** Differentiate between the "good" pain of muscle work and the "bad" pain of tendon irritation. A little discomfort is okay, but sharp pain is a red flag.',
          '**Landing Mechanics:** Focus on landing softly and absorbing impact through the hips, not just the knees.',
        ]
      },
      {
        title: 'Phase 4: Full Duty & Prevention',
        icon: 'ShieldCheckIcon',
        summary: 'Build a robust lower body to prevent recurrence.',
        details: [
          '**Posterior Chain Strength:** Strong glutes and hamstrings take pressure off the patellar tendon. Incorporate Romanian Deadlifts (RDLs), hip thrusts, and good mornings.',
          '**Single-Leg Work:** Address any imbalances with Bulgarian split squats, single-leg RDLs, and lunges.',
          '**Mobility:** Ensure you have adequate ankle (dorsiflexion) and hip mobility to allow for proper squat mechanics.',
          '**Pacing:** In long workouts, don\'t do large, unbroken sets of high-impact movements. Break them up from the start.',
        ]
      },
    ]
  },
  {
    id: 'runners-knee-pfps',
    name: 'Runner\'s Knee (PFPS)',
    bodyPart: 'Knee',
    description: 'Aching pain around or behind the kneecap (patella), often aggravated by running, squatting, or going up/down stairs.',
    keywords: ['knee', 'runner\'s knee', 'patellofemoral pain syndrome', 'anterior knee pain'],
    roadmap: [
      {
        title: 'Phase 1: Calm the Knee',
        icon: 'SnowflakeIcon',
        summary: 'Reduce activities that cause pain and focus on releasing tension in muscles that affect the knee.',
        details: [
          '**Relative Rest:** Significantly reduce or stop running and deep-knee-bend activities.',
          '**Ice:** Apply ice to the front of the knee for 15 minutes after activity or at the end of the day to manage pain.',
          '**Foam Roll:** Target the quads, IT band, and TFL (tensor fasciae latae) muscle on the side of your hip. Tension here can pull the kneecap out of alignment.',
          '**Taping:** McConnell or Kinesio taping can sometimes provide immediate relief by helping to correct patellar tracking.',
        ]
      },
      {
        title: 'Phase 2: Hip & Glute Strengthening',
        icon: 'HeartPulseIcon',
        summary: 'The root cause of PFPS is often weak hips, not a problem at the knee itself. This phase is critical.',
        details: [
          '**Gluteus Medius Activation:** Focus on clamshells, side-lying leg raises, and lateral band walks. These muscles prevent the knee from caving inward (valgus).',
          '**Glute Bridges:** Strengthen the gluteus maximus to improve overall pelvic stability.',
          '**Quad Sets:** While lying down, tighten your quad muscle and press the back of your knee into the floor without pain.',
          '**Stretching:** Gently stretch the hamstrings and hip flexors.',
        ]
      },
      {
        title: 'Phase 3: Reintroduce Functional Movement',
        icon: 'BarbellIcon',
        summary: 'Begin to integrate squatting and lunging patterns with a strong focus on proper mechanics.',
        details: [
          '**Box Squats:** Squat to a box to control depth and focus on pushing the knees out and keeping the chest up.',
          '**Reverse Lunges:** These are often better tolerated than forward lunges as they put less stress on the patella.',
          '**Step-Downs:** Perform slow, controlled step-downs from a low step, ensuring the knee tracks over the foot and does not cave in.',
          '**Short-Distance Running:** When you return to running, start on a soft surface with short intervals and focus on increasing your cadence (taking more, shorter steps).',
        ]
      },
      {
        title: 'Phase 4: Building Resilience',
        icon: 'ShieldCheckIcon',
        summary: 'Develop a strong, balanced lower body to keep the knees healthy for the long term.',
        details: [
          '**Incorporate Single-Leg Work:** Bulgarian split squats and single-leg RDLs are excellent for building stability.',
          '**Check Your Footwear:** Ensure you are using appropriate shoes for your activities. Worn-out shoes can contribute to poor mechanics.',
          '**Warm-up Properly:** Always include glute activation exercises in your warm-up before a workout.',
          '**Listen to Your Body:** Manage your training volume and be mindful of sharp increases in running or squatting volume.',
        ]
      },
    ]
  },
  {
    id: 'it-band-syndrome',
    name: 'IT Band Syndrome',
    bodyPart: 'Knee',
    description: 'Sharp, burning pain on the outside of the knee, typically flaring up during repetitive flexion and extension like running or cycling.',
    keywords: ['knee', 'it band', 'iliotibial band', 'outside knee pain', 'lateral knee pain'],
    roadmap: [
      {
        title: 'Phase 1: Reduce Inflammation & Tension',
        icon: 'SnowflakeIcon',
        summary: 'The priority is to stop irritating the IT band and address the muscular tension that contributes to the problem.',
        details: [
          '**Stop the Aggravating Activity:** This is non-negotiable. For most, this means stopping running immediately.',
          '**Foam Roll Key Areas:** Focus on the glutes, TFL (side of the hip), and quads. **Avoid aggressively rolling the painful part of the IT band on the side of the knee**, as this can increase inflammation.',
          '**Ice:** Apply ice to the painful spot on the outside of the knee for 15-20 minutes, multiple times per day.',
          '**Stretching:** Perform a standing IT band stretch and piriformis/glute stretches.',
        ]
      },
      {
        title: 'Phase 2: Strengthen the Hips',
        icon: 'HeartPulseIcon',
        summary: 'Like runner\'s knee, ITBS is often a symptom of weak hip abductor muscles (specifically the gluteus medius).',
        details: [
          '**Clamshells:** A classic exercise to isolate the gluteus medius. Ensure your hips stay stacked and you don\'t rock back.',
          '**Side-Lying Leg Raises:** Another excellent isolation exercise. Keep the movement slow and controlled.',
          '**Lateral Band Walks:** Maintain a good athletic stance and keep tension on the band throughout the movement.',
          '**Hip Thrusts / Glute Bridges:** Strengthen the primary hip extensors.',
        ]
      },
      {
        title: 'Phase 3: Neuromuscular Re-education',
        icon: 'BarbellIcon',
        summary: 'Teach your body to use its newfound hip strength during functional movements to correct poor mechanics.',
        details: [
          '**Single-Leg Balance:** Practice standing on one leg. Once stable, progress to closing your eyes or standing on an unstable surface.',
          '**Controlled Step-Downs:** Focus on preventing the hip from dropping on the non-standing side (Trendelenburg sign).',
          '**Gait Retraining:** When returning to running, focus on increasing your step rate (cadence) by 5-10%. This reduces peak forces at the knee.',
          '**Initial Return to Running:** Start with a walk/run program on a flat, soft surface. Begin with very short intervals (e.g., run 1 min, walk 2 min) and gradually increase.',
        ]
      },
      {
        title: 'Phase 4: Prevention & Performance',
        icon: 'ShieldCheckIcon',
        summary: 'Build a strong and stable foundation to handle the demands of training without a recurrence of symptoms.',
        details: [
          '**Make Hip Work a Staple:** Continue to include hip and glute strengthening exercises in your warm-ups or as accessory work 2-3 times per week.',
          '**Monitor Your Volume:** Avoid sudden, large increases in your running mileage or cycling volume.',
          '**Cross-Training:** Incorporate other forms of cardio like rowing or swimming that are less stressful on the IT band.',
          '**Proper Footwear:** Ensure your running shoes are not worn out and provide the right support for your foot type.',
        ]
      },
    ]
  },
  // === LOWER BACK ===
  {
    id: 'lower-back-strain',
    name: 'Lower Back Strain',
    bodyPart: 'Lower Back',
    description: 'A dull ache or sharp pain in the lower back, often caused by lifting with a rounded spine or overuse.',
    keywords: ['back', 'lumbar', 'strain', 'pain', 'deadlift', 'squat'],
    roadmap: [
      {
        title: 'Phase 1: Acute Care & Decompression',
        icon: 'SnowflakeIcon',
        summary: 'Focus on calming muscle spasms, reducing pain, and promoting gentle, pain-free movement.',
        details: [
          '**Avoid Spinal Loading:** No heavy back squats, deadlifts, or other movements that compress the spine.',
          '**Gentle Movement:** Go for walks. Lying on your back and gently rocking your knees side-to-side can help.',
          '**Cat-Cow Stretch:** Perform this slowly and within a pain-free range to promote spinal mobility and blood flow.',
          '**Positional Relief:** Lying on your back with your feet up on a chair (90/90 position) can help decompress the lumbar spine.',
        ]
      },
      {
        title: 'Phase 2: Core Stability & Glute Activation',
        icon: 'HeartPulseIcon',
        summary: 'Re-establish a strong, stable core and teach the glutes to do their job to protect the lower back.',
        details: [
          '**Bird-Dog:** A fantastic exercise for core stability. (3 sets of 10-12 reps per side, focus on control).',
          '**Glute Bridges:** Teach hip extension without involving the lower back. Squeeze the glutes at the top.',
          '**Planks:** Focus on maintaining a neutral spine. Don\'t let the hips sag.',
          '**Dead Bugs:** Excellent for learning to brace the core while moving the limbs.',
        ],
        externalResource: {
          label: 'Watch: Core Stability for Athletes',
          url: 'https://www.youtube.com/watch?v=kfxk9a_5G6k'
        }
      },
      {
        title: 'Phase 3: Re-learning the Hinge',
        icon: 'BarbellIcon',
        summary: 'Re-pattern the fundamental hip hinge movement with light loads before returning to heavy lifting.',
        details: [
          '**Kettlebell/Dumbbell RDLs:** Start with light weight and focus on pushing the hips back while maintaining a perfectly flat back. Do not chase range of motion.',
          '**Good Mornings:** Use an empty barbell or PVC pipe. This is an excellent tool for teaching the hip hinge.',
          '**Box Squats to a High Box:** Control the descent and focus on maintaining an upright chest and neutral spine.',
          '**GHD Hip Extensions:** Strengthen the posterior chain without loading the spine.',
        ]
      },
      {
        title: 'Phase 4: Return to Lifting & Prevention',
        icon: 'ShieldCheckIcon',
        summary: 'Build a bulletproof core and posterior chain to protect your back for the long haul.',
        details: [
          '**Bracing, Bracing, Bracing:** Before every lift, practice the Valsalva maneuver (taking a big breath and bracing your core as if you\'re about to be punched). This is your internal weight belt.',
          '**Tempo Training:** When returning to deadlifts and squats, use a slow eccentric (3-5 seconds down) to build control.',
          '**Accessory Work:** Make core and glute work a non-negotiable part of your routine. Heavy farmer\'s carries, planks, and hip thrusts are your best friends.',
          '**Leave Your Ego at the Door:** Never sacrifice form for weight. A rounded back on a lift is a failed lift, regardless of whether you completed the rep.',
        ]
      },
    ]
  },
  {
    id: 'sciatica-nerve-pain',
    name: 'Sciatica / Nerve Pain',
    bodyPart: 'Lower Back',
    description: 'Radiating pain, tingling, or numbness that travels from the lower back down the leg, often following the path of the sciatic nerve.',
    keywords: ['back', 'sciatic', 'sciatica', 'nerve', 'radiating pain', 'tingling', 'numbness'],
    roadmap: [
      {
        title: 'Phase 1: Symptom Reduction & Directional Preference',
        icon: 'SnowflakeIcon',
        summary: 'The goal is to find movements and positions that "centralize" the symptoms (move them out of the leg and closer to the spine).',
        details: [
          '**Consult a Professional:** Nerve pain should be evaluated by a doctor or physical therapist to rule out serious conditions.',
          '**Avoid Flexion:** Stop all sit-ups, crunches, and toe-touches. Avoid prolonged sitting with a slouched posture.',
          '**Find Your Directional Preference:** For many, gentle press-ups (lying on your stomach and pressing your chest up) can help centralize pain. If this increases leg pain, stop immediately.',
          '**Nerve Glides/Flossing:** Perform gentle sciatic nerve glides only if they do not increase symptoms.',
        ]
      },
      {
        title: 'Phase 2: Core Stability in Neutral Spine',
        icon: 'HeartPulseIcon',
        summary: 'Strengthen the deep core muscles to protect the spine and prevent positions that irritate the nerve.',
        details: [
          '**McGill Big 3:** The bird-dog, side plank, and modified curl-up are the gold standard for building a stable, resilient core without stressing the spine.',
          '**Walking:** Frequent short walks are excellent for promoting blood flow and reducing nerve sensitivity.',
          '**Hip Mobility:** Work on hip flexor and piriformis mobility, as tightness in these areas can sometimes contribute to nerve irritation.',
          '**Focus on Bracing:** Learn to create intra-abdominal pressure to stabilize the spine before any movement.',
        ]
      },
      {
        title: 'Phase 3: Re-patterning Movement',
        icon: 'BarbellIcon',
        summary: 'Safely reintroduce fundamental movements, ensuring the hips are doing the work, not the lower back.',
        details: [
          '**Hip Hinge Mastery:** Use a PVC pipe along your back to practice hinging with a perfectly neutral spine.',
          '**Goblet Squats:** Holding a weight in front encourages an upright torso and takes pressure off the lower back.',
          '**Suitcase Carries:** This single-sided carry is fantastic for strengthening the obliques and quadratus lumborum, which are key spinal stabilizers.',
          '**Avoid High-Impact Loading:** Initially, avoid movements that involve jarring impacts, like box jumps or heavy running.',
        ]
      },
      {
        title: 'Phase 4: Building a Resilient System',
        icon: 'ShieldCheckIcon',
        summary: 'Transition from rehabilitation to performance by building strength in a way that supports long-term back health.',
        details: [
          '**Prioritize Form Over Weight:** When returning to barbell lifts, reduce the weight by at least 50% and focus on flawless mechanics.',
          '**Incorporate Unilateral Work:** Single-leg RDLs and Bulgarian split squats can build hip and glute strength without the heavy spinal compression of a back squat.',
          '**Listen to Early Warning Signs:** Do not push through tingling or radiating pain. It is a signal to stop and reassess.',
          '**Maintain Core Work:** Do not stop doing your core stability exercises just because the pain is gone. They are your long-term insurance policy.',
        ]
      },
    ]
  },
  // === ELBOW ===
  {
    id: 'tennis-elbow',
    name: 'Tennis Elbow (Lateral Epicondylitis)',
    bodyPart: 'Elbow',
    description: 'Pain and tenderness on the outside of the elbow, often caused by overuse of the wrist extensor muscles. Common in activities involving gripping.',
    keywords: ['elbow', 'tennis elbow', 'lateral epicondylitis', 'grip', 'forearm'],
    roadmap: [
      {
        title: 'Phase 1: Pain & Inflammation Control',
        icon: 'SnowflakeIcon',
        summary: 'Reduce the strain on the inflamed tendons and manage acute pain.',
        details: [
          '**Modify Gripping:** Use a neutral grip for pulling, or use lifting straps to deload the forearm muscles. Avoid false grip on rings.',
          '**Ice Massage:** Freeze a paper cup of water and massage the painful area for 5-7 minutes.',
          '**Forearm Muscle Release:** Use a lacrosse ball or foam roller to gently release trigger points in the wrist extensor muscles (top of the forearm).',
          '**Counterforce Brace:** A "tennis elbow strap" worn just below the elbow can help dissipate forces and reduce pain during activity.',
        ]
      },
      {
        title: 'Phase 2: Mobility & Isometric Loading',
        icon: 'HeartPulseIcon',
        summary: 'Restore wrist mobility and begin to load the tendon in a way that reduces pain.',
        details: [
          '**Wrist Extensor Stretch:** Gently pull your fingers down to stretch the top of your forearm. Hold for 30 seconds.',
          '**Isometric Wrist Extension:** With palm down, press the back of your hand up against a table. Hold for 30-45 seconds for 3-5 reps.',
          '**Shoulder Health:** Poor shoulder stability can cause downstream problems at the elbow. Incorporate band pull-aparts and face pulls.',
          '**Thoracic Mobility:** Ensure you have good upper back mobility to allow for proper shoulder mechanics.',
        ]
      },
      {
        title: 'Phase 3: Eccentric Strengthening',
        icon: 'BarbellIcon',
        summary: 'This is the most critical phase for tendon healing. Focus on the lengthening (eccentric) portion of the muscle contraction.',
        details: [
          '**Tyler Twist (FlexBar):** This is a gold-standard exercise for tennis elbow. Perform 3 sets of 15 reps daily.',
          '**Eccentric Wrist Extension:** Use a light dumbbell. With palm down, use your other hand to lift the weight up, then slowly lower it down over 3-5 seconds.',
          '**Hammer Rotation Drills:** Holding a hammer or light dumbbell, slowly rotate your forearm from palm up to palm down.',
          '**Grip Strengthening:** Squeeze a stress ball or grip trainer to build endurance in the forearm muscles.',
        ]
      },
      {
        title: 'Phase 4: Prevention & Load Management',
        icon: 'ShieldCheckIcon',
        summary: 'Build a resilient arm and adopt strategies to prevent recurrence.',
        details: [
          '**Balance Your Grip:** Ensure you are not "death gripping" the barbell or pull-up bar. Use the minimum force necessary.',
          '**Strengthen the Entire Chain:** A strong back and shoulders will take pressure off the smaller muscles of the forearm.',
          '**Vary Your Grip:** Use a mix of grips in your training (pronated, supinated, neutral) to avoid overuse.',
          '**Warm-up Thoroughly:** Always perform wrist stretches and light activation drills before high-volume grip work.',
        ]
      },
    ]
  },
  {
    id: 'golfers-elbow',
    name: 'Golfer\'s Elbow (Medial Epicondylitis)',
    bodyPart: 'Elbow',
    description: 'Pain and tenderness on the inside of the elbow, from overuse of the wrist flexor muscles. Common in pull-ups and heavy carries.',
    keywords: ['elbow', 'golfer\'s elbow', 'medial epicondylitis', 'pull-ups', 'forearm'],
    roadmap: [
      {
        title: 'Phase 1: Reduce Strain & Manage Pain',
        icon: 'SnowflakeIcon',
        summary: 'Calm the irritated tendons on the inner elbow and identify aggravating activities.',
        details: [
          '**Modify Pulling:** Switch to a neutral or supinated (chin-up) grip for pull-ups, which is often less stressful. Reduce volume significantly.',
          '**Avoid Heavy Carries:** Farmer\'s carries and other heavy loaded carries should be avoided initially.',
          '**Ice Massage:** Gently massage the painful inner elbow and forearm muscles with ice.',
          '**Forearm Muscle Release:** Use a lacrosse ball to release trigger points in the wrist flexor muscles (bottom of the forearm).',
        ]
      },
      {
        title: 'Phase 2: Restore Mobility & Begin Loading',
        icon: 'HeartPulseIcon',
        summary: 'Improve wrist mobility and start pain-free isometric loading.',
        details: [
          '**Wrist Flexor Stretch:** Gently pull your hand back to stretch the muscles on the bottom of your forearm. Hold for 30 seconds.',
          '**Isometric Wrist Flexion:** With palm up, press your hand up against a table. Hold for 30-45 seconds for 3-5 reps.',
          '**Towel Wringing:** Gently wring out a towel in both directions to work the forearm rotators.',
          '**Nerve Glides:** Perform ulnar nerve glides if you feel any tingling in your ring or pinky finger, but be gentle.',
        ]
      },
      {
        title: 'Phase 3: Eccentric Strengthening',
        icon: 'BarbellIcon',
        summary: 'Strengthen the wrist flexor tendons by focusing on the slow lowering phase of movements.',
        details: [
          '**Eccentric Wrist Flexion:** Use a light dumbbell. With palm up, use your other hand to lift the weight, then slowly lower it over 3-5 seconds.',
          '**Reverse Tyler Twist (FlexBar):** Perform the "Tyler Twist" exercise but for the wrist flexors.',
          '**Bicep Curls:** Controlled bicep curls can also help strengthen the forearm flexors.',
          '**Introduce Pulling Volume Slowly:** Start with low-rep sets of ring rows or jumping pull-ups, focusing on form.',
        ]
      },
      {
        title: 'Phase 4: Build Resilient Grip & Pulling Strength',
        icon: 'ShieldCheckIcon',
        summary: 'Develop strong, enduring grip and pulling mechanics to handle the demands of CrossFit.',
        details: [
          '**Thick Grips:** Use Fat Gripz or other thick-grip implements for some of your pulling and carrying work to build formidable grip strength.',
          '**Scapular Strength:** The stronger your scapular control (via rows, face pulls), the less stress is transferred down to the elbow.',
          '**Pacing:** In workouts with high-volume pulling (e.g., "Cindy"), break up your sets from the very beginning to manage forearm fatigue.',
          '**Hook Grip on Barbell:** Using a hook grip on a barbell can help deload the forearm flexors during heavy lifts.',
        ]
      },
    ]
  },
  // === WRIST ===
  {
    id: 'wrist-sprain',
    name: 'Wrist Sprain',
    bodyPart: 'Wrist',
    description: 'Pain, swelling, and instability in the wrist, typically after a fall onto an outstretched hand (FOOSH) or a failed heavy lift.',
    keywords: ['wrist', 'sprain', 'foosh', 'front rack', 'painful'],
    roadmap: [
      {
        title: 'Phase 1: Protection, Rest, Ice, Compression, Elevation (PRICE)',
        icon: 'SnowflakeIcon',
        summary: 'The goal is to protect the wrist from further injury, control swelling, and allow the healing process to begin.',
        details: [
          '**Avoid Weight-Bearing:** No push-ups, burpees, handstands, or front squats. This is critical.',
          '**Ice:** Apply ice for 15 minutes at a time, several times a day.',
          '**Compression:** A compression wrap can help manage swelling.',
          '**Gentle Finger Motion:** Wiggle your fingers gently to promote blood flow without moving the wrist.',
        ]
      },
      {
        title: 'Phase 2: Gentle Range of Motion & Activation',
        icon: 'HeartPulseIcon',
        summary: 'Gradually reintroduce movement to prevent stiffness and wake up the supporting muscles.',
        details: [
          '**Active Range of Motion:** Gently move the wrist through flexion, extension, and side-to-side motions within a pain-free range. "Writing" the alphabet is a great drill.',
          '**Isometric Strengthening:** Gently press your hand against your other hand in all directions without allowing movement. Hold for 5-10 seconds.',
          '**Grip Squeezing:** Start squeezing a soft stress ball or therapy putty.',
          '**Heat Before Motion:** Using a heat pack before these exercises can help improve flexibility.',
        ]
      },
      {
        title: 'Phase 3: Progressive Strengthening',
        icon: 'BarbellIcon',
        summary: 'Begin to load the wrist to rebuild strength and stability.',
        details: [
          '**Resistance Band Exercises:** Use a light resistance band to perform wrist flexion, extension, ulnar deviation, and radial deviation.',
          '**Light Dumbbell Curls:** Start with very light dumbbells (1-2 kg) for wrist curls (flexion and extension).',
          '**Proprioception:** Balance a light object (like a water bottle) on the back of your hand.',
          '**Modified Weight-Bearing:** Start with push-ups on an incline (against a wall or high box) to gradually reintroduce load.',
        ]
      },
      {
        title: 'Phase 4: Return to CrossFit-Specific Demands',
        icon: 'ShieldCheckIcon',
        summary: 'Rebuild the wrist\'s capacity to handle the specific stresses of front racks, overhead lifts, and gymnastics.',
        details: [
          '**Use Wrist Wraps:** When returning to lifting, use supportive wrist wraps to provide external stability.',
          '**Kettlebells are Your Friend:** The offset nature of kettlebells in the front rack can be more forgiving than a barbell. Start with KB front squats and presses.',
          '**Gradual Overhead Progression:** Start with light dumbbell overhead presses before moving to a barbell.',
          '**Improve Mobility:** Work on wrist, forearm, and shoulder mobility to ensure a better front rack position that doesn\'t over-stress the wrist joint.',
        ]
      },
    ]
  },
  // === ANKLE ===
  {
    id: 'ankle-sprain',
    name: 'Ankle Sprain',
    bodyPart: 'Ankle',
    description: 'Pain and swelling on the outside of the ankle after "rolling" it. The most common type is an inversion sprain.',
    keywords: ['ankle', 'sprain', 'rolled ankle', 'inversion', 'ligament'],
    roadmap: [
      {
        title: 'Phase 1: Protection & Swelling Management',
        icon: 'SnowflakeIcon',
        summary: 'The initial focus is on the PRICE protocol (Protection, Rest, Ice, Compression, Elevation) to control inflammation and pain.',
        details: [
          '**Protection/Rest:** Avoid walking on the ankle if it causes a limp. Use crutches if necessary.',
          '**Ice & Compression:** Use a compression wrap and apply ice over it for 15-20 minutes every few hours.',
          '**Elevation:** Keep the ankle elevated above the level of your heart as much as possible.',
          '**Ankle Alphabet:** As pain allows, gently trace the letters of the alphabet with your big toe to maintain range of motion.',
        ]
      },
      {
        title: 'Phase 2: Restoring Motion & Balance',
        icon: 'HeartPulseIcon',
        summary: 'Regain full range of motion and begin to retrain your sense of balance (proprioception), which is often lost after a sprain.',
        details: [
          '**Dorsiflexion Stretch:** Use a towel or band to gently pull your foot towards you, stretching the calf and Achilles.',
          '**Single-Leg Balance:** Start by trying to balance on the injured leg on a stable floor. Begin with 15 seconds and build up to 60 seconds.',
          '**Weight Shifts:** Stand with feet shoulder-width apart and gently shift your weight from side to side and forward and back.',
          '**Banded Movements:** Begin light resistance band exercises for all four ankle movements (inversion, eversion, dorsiflexion, plantarflexion).',
        ]
      },
      {
        title: 'Phase 3: Strengthening',
        icon: 'BarbellIcon',
        summary: 'Build strength in the muscles that support the ankle to create dynamic stability.',
        details: [
          '**Calf Raises:** Perform calf raises with both feet, progressing to single-leg calf raises as tolerated.',
          '**Balance on Unstable Surfaces:** Progress your single-leg balance to a pillow, foam pad, or BOSU ball.',
          '**Modified Lifting:** You can often return to lifting movements like squats and deadlifts before running, as they are more stable. Ensure the ankle is pain-free.',
          '**Incorporate Hops:** Begin with small, two-footed hops in place, progressing to single-leg hops.',
        ]
      },
      {
        title: 'Phase 4: Return to Dynamic Activity',
        icon: 'ShieldCheckIcon',
        summary: 'Prepare the ankle for the high-speed, multi-directional demands of CrossFit.',
        details: [
          '**Plyometric Progression:** Progress from hops to box jumps, ensuring you focus on soft, controlled landings.',
          '**Agility Drills:** Perform side shuffles, carioca, and zig-zag running drills to retrain the ankle\'s ability to change direction.',
          '**Return to Running & Double-Unders:** Start with short intervals and gradually increase the volume, monitoring for any pain or swelling.',
          '**Consider Bracing/Taping:** For an extra layer of support during the initial return to high-impact activities, consider a lace-up brace or athletic taping.',
        ]
      },
    ]
  },
  {
    id: 'achilles-tendinopathy',
    name: 'Achilles Tendinopathy',
    bodyPart: 'Ankle',
    description: 'Pain, stiffness, and swelling in the Achilles tendon, the cord connecting your calf muscle to your heel. Often worse in the morning.',
    keywords: ['ankle', 'achilles', 'tendon', 'heel cord', 'running', 'jumping'],
    roadmap: [
      {
        title: 'Phase 1: Load Management & Pain Relief',
        icon: 'SnowflakeIcon',
        summary: 'Reduce the stress on the tendon to a level that allows it to calm down and heal.',
        details: [
          '**Stop High-Impact Activities:** Immediately stop all running, jumping, and double-unders.',
          '**Relative Rest:** You can still perform upper body work and lower body movements that don\'t stress the tendon (e.g., seated leg extensions).',
          '**Heel Lift:** Placing a small heel lift in both shoes can temporarily shorten the calf/Achilles complex and reduce strain during walking.',
          '**Isometric Holds:** Perform single-leg calf raises and hold the top position for 30-45 seconds for 3-5 sets. This is often pain-relieving.',
        ]
      },
      {
        title: 'Phase 2: Heavy Slow Resistance',
        icon: 'HeartPulseIcon',
        summary: 'This is the evidence-based core of Achilles rehab. The goal is to load the tendon heavily and slowly to stimulate healing and remodeling.',
        details: [
          '**Seated and Standing Calf Raises:** Focus on a slow tempo (3 seconds up, 3 seconds down). Aim for heavy weight that you can perform 6-8 quality reps with.',
          '**Eccentric Heel Drops (Alfredson Protocol):** Perform heel drops off a step. Go up with both feet, then slowly lower over 3-5 seconds with only the injured leg. Perform with both a straight knee and a bent knee.',
          '**Foam Roll Calves:** Keep the calf muscles pliable by foam rolling, but avoid rolling directly on the painful part of the tendon.',
          '**Soft Tissue Work:** Consider professional massage or self-massage for the calf muscles.',
        ]
      },
      {
        title: 'Phase 3: Reintroducing Energy Storage (Plyometrics)',
        icon: 'BarbellIcon',
        summary: 'Gradually retrain the tendon\'s ability to act like a spring, which is necessary for running and jumping.',
        details: [
          '**Start with Hops:** Begin with two-footed pogo hops, keeping knees relatively straight to isolate the calf/ankle. Progress to single-leg hops.',
          '**Volume is Key:** Start with low volume (e.g., 3 sets of 20 hops) and monitor the tendon\'s reaction over the next 24 hours.',
          '**Progress to Jumping:** Once hopping is pain-free, you can reintroduce small box jumps and then double-unders.',
          '**Return to Running:** Start with a walk/run program. Focus on landing mid-foot and increasing your step rate (cadence).',
        ]
      },
      {
        title: 'Phase 4: Full Return & Prevention',
        icon: 'ShieldCheckIcon',
        summary: 'Build a resilient lower leg that can handle the demands of your training.',
        details: [
          '**Maintain Strength Work:** Do not stop doing your heavy, slow calf raises. They are your best insurance against recurrence.',
          '**Improve Ankle Mobility:** Ensure you have adequate dorsiflexion. Poor mobility can increase strain on the Achilles.',
          '**Proper Footwear:** Make sure your shoes are not worn out and are appropriate for the activity.',
          '**Manage Volume Wisely:** Be cautious about sudden large increases in running or jumping volume in your programming.',
        ]
      },
    ]
  },
];
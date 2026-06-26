/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, GraduationCap, Heart, Sparkles } from 'lucide-react';

interface CohortFact {
  id: number;
  short: string;
  category: string;
  extended: string;
  noteX: number;
  noteY: number;
  targetX: number;
  targetY: number;
  arrowD: string;
}

interface CohortMember {
  id: string;
  name: string;
  image: string;
  role: string;
  motto: string;
  bio: string;
  chalkboardWatermark: string;
  colorTheme: string;
  facts: CohortFact[];
}

const COHORT_DATA: CohortMember[] = [
  {
    id: 'ANDREW',
    name: 'Andrew',
    image: '/assets/images/Andrew.png',
    role: 'Team Member',
    motto: "Treasures in Heaven over earthly riches",
    bio: "Andrew is a passionate and dedicated member of the Discipleship Team. Rooted in South Africa, he combines a deep study of the Scriptures with a spirit of joyful service and real-life peer engagement.",
    chalkboardWatermark: 'ANDREW',
    colorTheme: 'text-[#4C6B7B]/20',
    facts: [
      {
        id: 1,
        short: "Born 22 June 2007 • Proudly South African",
        category: "Roots & Identity",
        extended: "Andrew represents the next generation of South African disciples. Born in 2007, he is grounded in his local heritage with a bright, visionary outlook.",
        noteX: 18,
        noteY: 10,
        targetX: 42,
        targetY: 28,
        arrowD: "M 18 10 Q 30 18 42 28"
      },
      {
        id: 2,
        short: "Treasures in Heaven (Matthew 6:20-21)",
        category: "Spiritual Anchor",
        extended: "Andrew's guidepost: 'But lay up for yourselves treasures in heaven, where neither moth nor rust destroys and where thieves do not break in and steal. For where your treasure is, there your heart will be also.'",
        noteX: 82,
        noteY: 10,
        targetX: 58,
        targetY: 20,
        arrowD: "M 82 10 Q 70 12 58 20"
      },
      {
        id: 3,
        short: "Bucket list: Iceland (Northern Lights)",
        category: "Aspirational Vision",
        extended: "Andrew dreams of witnessing the dance of the Northern Lights across the Arctic skies of Iceland—a testament to his sense of wonder and pursuit of natural beauty.",
        noteX: 16,
        noteY: 26,
        targetX: 42,
        targetY: 40,
        arrowD: "M 16 26 Q 28 32 42 40"
      },
      {
        id: 4,
        short: "Mom's Homemade Mac & Cheese",
        category: "Culinary Comfort",
        extended: "Nothing in the world beats the warmth, safety, and deep nostalgia of Mom's homemade baked macaroni and cheese.",
        noteX: 16,
        noteY: 42,
        targetX: 41,
        targetY: 52,
        arrowD: "M 16 42 Q 28 46 41 52"
      },
      {
        id: 5,
        short: "Fav Drink: Cola Tonic & Lemonade",
        category: "Refreshment Standard",
        extended: "Andrew's ultimate companion for a summer afternoon or celebration is a crisp, classic South African blend of Cola tonic & lemonade.",
        noteX: 84,
        noteY: 26,
        targetX: 58,
        targetY: 34,
        arrowD: "M 84 26 Q 72 30 58 34"
      },
      {
        id: 6,
        short: "Favorite Bible Character: David",
        category: "Faith Hero",
        extended: "Deeply inspired by the shepherd boy who became king, Andrew studies David's absolute courage, musical heart, and profound humility before God.",
        noteX: 84,
        noteY: 42,
        targetX: 58,
        targetY: 48,
        arrowD: "M 84 42 Q 72 45 58 48"
      },
      {
        id: 7,
        short: "Fav Movie: Kung Fu Panda",
        category: "Creative Inspiration",
        extended: "A delightful favorite! Po's journey from a humble noodle shop helper to the legendary Dragon Warrior highlights the beauty of faith, self-discovery, and humility.",
        noteX: 84,
        noteY: 58,
        targetX: 58,
        targetY: 62,
        arrowD: "M 84 58 Q 72 60 58 62"
      },
      {
        id: 8,
        short: "Book: Harry Potter and the Deathly Hallows",
        category: "Literary Journey",
        extended: "The epic conclusion of self-sacrifice, friendship, and loyalty in J.K. Rowling's masterpiece holds a special place in Andrew's library.",
        noteX: 80,
        noteY: 74,
        targetX: 59,
        targetY: 76,
        arrowD: "M 80 74 Q 70 75 59 76"
      },
      {
        id: 9,
        short: "Weekend Activity: Video Gaming",
        category: "Weekend Hobby",
        extended: "Connecting with friends online and diving into strategic digital worlds is Andrew's favorite way to spend a relaxing weekend afternoon.",
        noteX: 18,
        noteY: 74,
        targetX: 36,
        targetY: 78,
        arrowD: "M 18 74 Q 26 80 36 78"
      }
    ]
  },
  {
    id: 'MICAELLA',
    name: 'Micaella',
    image: '/assets/images/Micaella.png',
    role: 'Team Member',
    motto: "Stand still and watch the Lord's hand",
    bio: "Micaella brings a heart of kindness and creative discipline to our community workspace, encouraging peers to standardize their focus around joy.",
    chalkboardWatermark: 'MICAELLA',
    colorTheme: 'text-[#CE9EB9]/25',
    facts: [
      {
        id: 1,
        short: "Born 22 June 2007 • Proudly South African",
        category: "Roots & Identity",
        extended: "Micaella represents the next generation of South African disciples. Born in 2007, she brings a warm coastal joy and deep commitment to community growth.",
        noteX: 18,
        noteY: 10,
        targetX: 42,
        targetY: 28,
        arrowD: "M 18 10 Q 30 18 42 28"
      },
      {
        id: 2,
        short: "Isaiah 43:2 & Matthew 18:12",
        category: "Spiritual Anchor",
        extended: "'When you walk through the waters, I will be with you.' & 'If a man has a hundred sheep, and one goes astray, will he not leave the ninety-nine to find the one?'",
        noteX: 82,
        noteY: 10,
        targetX: 58,
        targetY: 20,
        arrowD: "M 82 10 Q 70 12 58 20"
      },
      {
        id: 3,
        short: "Worship Song: Echo Holy",
        category: "Praise & Prayer",
        extended: "Connecting deeply to the heart of worship, Micaella's spirit aligns with anthems of absolute adoration, declaring 'Echo Holy'.",
        noteX: 16,
        noteY: 26,
        targetX: 42,
        targetY: 40,
        arrowD: "M 16 26 Q 28 32 42 40"
      },
      {
        id: 4,
        short: "Favourite Colour: Purple",
        category: "Personal Aesthetic",
        extended: "Purple is Micaella's defining shade—symbolizing creativity, spiritual depth, and the calm grace she models daily in peer interactions.",
        noteX: 16,
        noteY: 42,
        targetX: 41,
        targetY: 52,
        arrowD: "M 16 42 Q 28 46 41 52"
      },
      {
        id: 5,
        short: "Destination: Switzerland in Dec",
        category: "Dream Escape",
        extended: "Micaella dreams of experiencing a pristine, snow-covered Switzerland in the heart of December, enjoying the peaceful alpine winters.",
        noteX: 84,
        noteY: 26,
        targetX: 58,
        targetY: 34,
        arrowD: "M 84 26 Q 72 30 58 34"
      },
      {
        id: 6,
        short: "Comfort: Pizza & Chocolate",
        category: "Culinary Comfort",
        extended: "The ultimate cozy comfort combination: a delicious warm pizza followed by rich, creamy local chocolate.",
        noteX: 84,
        noteY: 42,
        targetX: 58,
        targetY: 48,
        arrowD: "M 84 42 Q 72 45 58 48"
      },
      {
        id: 7,
        short: "Favourite Movie: Mamma Mia",
        category: "Creative Inspiration",
        extended: "For energy, joyful soundtracks, and scenic sun-drenched Greek landscapes, 'Mamma Mia' is Micaella's absolute feel-good film choice.",
        noteX: 84,
        noteY: 58,
        targetX: 58,
        targetY: 62,
        arrowD: "M 84 58 Q 72 60 58 62"
      },
      {
        id: 8,
        short: "Favourite Drink: Hot Chocolate",
        category: "Warm Companion",
        extended: "Nothing beats a steaming cup of sweet, froth-topped hot chocolate during cold mornings or evening fellowship groups.",
        noteX: 80,
        noteY: 74,
        targetX: 59,
        targetY: 76,
        arrowD: "M 80 74 Q 70 75 59 76"
      },
      {
        id: 9,
        short: "Peer Living: Grace & Kindness",
        category: "Discipleship Heart",
        extended: "In our collective household space, Micaella promotes a culture of dynamic kindness and mutual support, anchoring every chore in joy.",
        noteX: 18,
        noteY: 74,
        targetX: 36,
        targetY: 78,
        arrowD: "M 18 74 Q 26 80 36 78"
      }
    ]
  },
  {
    id: 'JARRYD',
    name: 'Jarryd',
    image: '/assets/images/Jarryd.png',
    role: 'Team Member',
    motto: "It ain't about how hard you can get hit, but how hard you can keep moving forward.",
    bio: "Currently based in Hillcrest, KZN, Jarryd matches natural athletic grit and a love for playing rugby with a deep, perseverant, and funny character. He is a steadfast friend and dependable companion in the Discipleship Team.",
    chalkboardWatermark: 'JARRYD',
    colorTheme: 'text-[#4C6B7B]/20',
    facts: [
      {
        id: 1,
        short: "Located: Hillcrest, KZN",
        category: "Roots & Identity",
        extended: "Jarryd is currently based in the beautiful, supportive community of Hillcrest, KwaZulu-Natal.",
        noteX: 18,
        noteY: 10,
        targetX: 42,
        targetY: 28,
        arrowD: "M 18 10 Q 30 18 42 28"
      },
      {
        id: 2,
        short: "Fav Quote: Keep Moving Forward",
        category: "Life Motto",
        extended: "Jarryd's life-quote: 'It ain't about how hard you can hit. It's about how hard you can get hit and keep moving forward – that's how winning is done.'",
        noteX: 82,
        noteY: 10,
        targetX: 58,
        targetY: 20,
        arrowD: "M 82 10 Q 70 12 58 20"
      },
      {
        id: 3,
        short: "Favourite Hobby: Playing Rugby",
        category: "Sports & Vitality",
        extended: "An avid team player, Jarryd loves nothing more than playing rugby—building physical resilience, team spirit, and grit.",
        noteX: 16,
        noteY: 26,
        targetX: 42,
        targetY: 40,
        arrowD: "M 16 26 Q 28 32 42 40"
      },
      {
        id: 4,
        short: "Favourite Colour: Green",
        category: "Personal Aesthetic",
        extended: "Green is Jarryd's favourite colour, matching his sports-loving active drive, and love for nature and wide-open grass pitches.",
        noteX: 16,
        noteY: 42,
        targetX: 41,
        targetY: 52,
        arrowD: "M 16 42 Q 28 46 41 52"
      },
      {
        id: 5,
        short: "Bucket list: Brazil",
        category: "Aspirational Vision",
        extended: "Brazil is Jarryd's ultimate bucket list destination—longing to experience the beautiful coastline, culture, and iconic sports passion.",
        noteX: 84,
        noteY: 26,
        targetX: 58,
        targetY: 34,
        arrowD: "M 84 26 Q 72 30 58 34"
      },
      {
        id: 6,
        short: "Funniest memory: Golf Ball Incident",
        category: "Humour & Memory",
        extended: "A hilarious classic: the unforgettable moment when his friend got hit with a golf ball... by another friend!",
        noteX: 84,
        noteY: 42,
        targetX: 58,
        targetY: 48,
        arrowD: "M 84 42 Q 72 45 58 48"
      },
      {
        id: 7,
        short: "Go-to Drink: Ice-Cold Coke",
        category: "Refreshment Preference",
        extended: "Jarryd's absolute go-to refreshment to cool down during fellowship weekends is a sweet, crisp, ice-cold classic Coke.",
        noteX: 84,
        noteY: 58,
        targetX: 58,
        targetY: 62,
        arrowD: "M 84 58 Q 72 60 58 62"
      },
      {
        id: 8,
        short: "Traits: Sporty, Perseverant, Funny",
        category: "Core Character",
        extended: "Three simple descriptors that perfectly capture Jarryd's personality: Sporty, Perseverant, and Funny.",
        noteX: 80,
        noteY: 74,
        targetX: 59,
        targetY: 76,
        arrowD: "M 80 74 Q 70 75 59 76"
      },
      {
        id: 9,
        short: "Discipleship: Dedicated Fellow",
        category: "Discipleship Heart",
        extended: "In the study hall and peer circles of The Twelve, Jarryd stands out for his deep perseverance, loyalty, and wonderful humor.",
        noteX: 18,
        noteY: 74,
        targetX: 36,
        targetY: 78,
        arrowD: "M 18 74 Q 26 80 36 78"
      }
    ]
  },
  {
    id: 'TEHILLAH',
    name: 'Tehillah',
    image: '/assets/images/Tehillah.png',
    role: 'Team Member',
    motto: "Come to me, all who are weary and burdened, and I will give you rest.",
    bio: "Tehillah is an inspiring, warm, and creative member of our discipleship team. Born in 2007, she combines musical worship with a keen focus on child psychology and counseling.",
    chalkboardWatermark: 'TEHILLAH',
    colorTheme: 'text-[#CE9EB9]/25',
    facts: [
      {
        id: 1,
        short: "Born 17 May 2007 • Proudly South African",
        category: "Roots & Identity",
        extended: "Tehillah is a brilliant young South African leader born in May 2007, with a heart dedicated to guiding children and ministering to peers.",
        noteX: 18,
        noteY: 10,
        targetX: 42,
        targetY: 28,
        arrowD: "M 18 10 Q 30 18 42 28"
      },
      {
        id: 2,
        short: "Verse: Matthew 11:28",
        category: "Spiritual Anchor",
        extended: "'Come to me, all who are weary and burdened, and I will give you rest.' A beautiful reminder of Christ's gentle, refreshing presence.",
        noteX: 82,
        noteY: 10,
        targetX: 58,
        targetY: 20,
        arrowD: "M 82 10 Q 70 12 58 20"
      },
      {
        id: 3,
        short: "Career: Child Psychologist",
        category: "Aspirational Vision",
        extended: "Deeply emphatic, Tehillah aspires to study child psychology to support young children through behavioral counseling and mental health healing.",
        noteX: 16,
        noteY: 26,
        targetX: 42,
        targetY: 40,
        arrowD: "M 16 26 Q 28 32 42 40"
      },
      {
        id: 4,
        short: "Favourite Colour: Pink",
        category: "Personal Aesthetic",
        extended: "Tehillah's signature color is Pink, matching her bubbly, joyful warmth, gentleness, and creative spirit.",
        noteX: 16,
        noteY: 42,
        targetX: 41,
        targetY: 52,
        arrowD: "M 16 42 Q 28 46 41 52"
      },
      {
        id: 5,
        short: "Bible Books: Matthew & Psalms",
        category: "Scriptural Focus",
        extended: "She spends deep study time in the Gospel of Matthew tracking Christ's life, and in the book of Psalms finding lyrical expressions of praise.",
        noteX: 84,
        noteY: 26,
        targetX: 58,
        targetY: 34,
        arrowD: "M 84 26 Q 72 30 58 34"
      },
      {
        id: 6,
        short: "Favourite Treat: Chocolate Ice Cream",
        category: "Culinary Comfort",
        extended: "Nothing beats a cold, rich, and creamy scoop of chocolate ice cream to celebrate fellowship victories or enjoy on warm afternoons.",
        noteX: 84,
        noteY: 42,
        targetX: 58,
        targetY: 48,
        arrowD: "M 84 42 Q 72 45 58 48"
      },
      {
        id: 7,
        short: "Drinks: Coke & Sparkling Water",
        category: "Refreshment Standard",
        extended: "Tehillah's favorite companions—be it a sweet cold glass of Coke or a refreshing, crisp sparkling water during team study hours.",
        noteX: 84,
        noteY: 58,
        targetX: 58,
        targetY: 62,
        arrowD: "M 84 58 Q 72 60 58 62"
      },
      {
        id: 8,
        short: "Unique Skill: Double-Jointed Thumb",
        category: "Fun Fact",
        extended: "A super unique physical trait: Tehillah has a thumb that can bend extraordinarily far back, always a crowd-pleaser and fun conversation starter!",
        noteX: 80,
        noteY: 74,
        targetX: 59,
        targetY: 76,
        arrowD: "M 80 74 Q 70 75 59 76"
      },
      {
        id: 9,
        short: "Favourite Hero: Mary",
        category: "Bible Role Model",
        extended: "Highly inspired by Mary of Nazareth's faithful posture, choosing devotion, deep learning, and silent trust in God's sovereign path.",
        noteX: 18,
        noteY: 74,
        targetX: 36,
        targetY: 78,
        arrowD: "M 18 74 Q 26 80 36 78"
      }
    ]
  },
  {
    id: 'BEN',
    name: 'Ben',
    image: '/assets/images/Ben.png',
    role: 'Team Member',
    motto: "Put others before yourself, as Jesus did.",
    bio: "Born on July 16 and living in South Africa, Ben is a steadfast, brave, and faithful disciple who thrives on learning about God and His works. He models a selfless posture of putting others first, bringing a warm heart and helpful hands to team community services.",
    chalkboardWatermark: 'BEN',
    colorTheme: 'text-[#50664B]/20',
    facts: [
      {
        id: 1,
        short: "Born 16 July • Lives in South Africa",
        category: "Roots & Identity",
        extended: "Ben calls South Africa home, channeling deep local patriotism and resilient energy into our communal living and regional services.",
        noteX: 18,
        noteY: 10,
        targetX: 42,
        targetY: 28,
        arrowD: "M 18 10 Q 30 18 42 28"
      },
      {
        id: 2,
        short: "Ephesians 6:12 - Spiritual Battle",
        category: "Spiritual Anchor",
        extended: "'For our struggle is not against flesh and blood, but against the rulers, against the authorities, against the powers of this dark world...' A vital anchor for focus.",
        noteX: 82,
        noteY: 10,
        targetX: 58,
        targetY: 20,
        arrowD: "M 82 10 Q 70 12 58 20"
      },
      {
        id: 3,
        short: "Motto: Others before yourself",
        category: "Life Motto",
        extended: "'Put others before yourself, as Jesus did' is Ben's absolute guiding philosophy—modeled daily in work grids and chores.",
        noteX: 16,
        noteY: 26,
        targetX: 42,
        targetY: 40,
        arrowD: "M 16 26 Q 28 32 42 40"
      },
      {
        id: 4,
        short: "Fav Food: Italian Panettone",
        category: "Culinary Comfort",
        extended: "Because Italian festive treats hit differently! Ben has a special weakness for delicious, authentic fruit-filled panettone.",
        noteX: 16,
        noteY: 42,
        targetX: 41,
        targetY: 52,
        arrowD: "M 16 42 Q 28 46 41 52"
      },
      {
        id: 5,
        short: "Bucket list: Dream of Italy",
        category: "Aspirational Vision",
        extended: "To experience a grand historical, architectural, and culinary tour across various traditional regions of beautiful Italy.",
        noteX: 84,
        noteY: 26,
        targetX: 58,
        targetY: 34,
        arrowD: "M 84 26 Q 72 30 58 34"
      },
      {
        id: 6,
        short: "Bible Character: Daniel",
        category: "Bible Role Model",
        extended: "Deeply inspired by Daniel—who was absolutely steadfast in prayer, brave in the den of testing, and faithful under foreign rule.",
        noteX: 84,
        noteY: 42,
        targetX: 58,
        targetY: 48,
        arrowD: "M 84 42 Q 72 45 58 48"
      },
      {
        id: 7,
        short: "Joy Factor: Learning & Friends",
        category: "Smiles & Well-Being",
        extended: "Nothing sparks a brighter smile than learning about God and His glorious works, and spending peaceful fellowship with family and beloved peers.",
        noteX: 84,
        noteY: 58,
        targetX: 58,
        targetY: 62,
        arrowD: "M 84 58 Q 72 60 58 62"
      },
      {
        id: 8,
        short: "Fav Season: Glorious Summer",
        category: "Aesthetic Vibe",
        extended: "Ben loves the high temperature, long daylight hours, and vibrant outdoor sports community activities that define South African summers.",
        noteX: 80,
        noteY: 74,
        targetX: 59,
        targetY: 76,
        arrowD: "M 80 74 Q 70 75 59 76"
      },
      {
        id: 9,
        short: "Fellowship: Selfless Builder",
        category: "Discipleship Heart",
        extended: "Whether in group study, sports arrays, or heavy chore loads, Ben acts as a comforting sibling and resilient helper in our regional house.",
        noteX: 18,
        noteY: 74,
        targetX: 36,
        targetY: 78,
        arrowD: "M 18 74 Q 26 80 36 78"
      }
    ]
  },
  {
    id: 'KAITLYN',
    name: 'Kaitlyn',
    image: '/assets/images/Kaitlyn.png',
    role: 'Team Member',
    motto: "He set my feet upon a rock • Psalm 40:1–3",
    bio: "Born on February 11, 2007, Kaitlyn anchors her journey in absolute patience and resilience. She carries a heart of loyalty and deep-rooted faith, dreaming of teaching contemporary, modern, and jazz dance to inspire future generations.",
    chalkboardWatermark: 'KAITLYN',
    colorTheme: 'text-[#CE9EB9]/25',
    facts: [
      {
        id: 1,
        short: "Born 11 Feb 2007 • South Africa",
        category: "Roots & Identity",
        extended: "Kaitlyn is a brilliant Free State-born disciple representing quiet strength and diligent focus in the Discipleship Team.",
        noteX: 18,
        noteY: 10,
        targetX: 42,
        targetY: 28,
        arrowD: "M 18 10 Q 30 18 42 28"
      },
      {
        id: 2,
        short: "Psalm 40:1–3 - Out of the Clay",
        category: "Spiritual Anchor",
        extended: "'I waited patiently for the Lord... He lifted me out of the pit of destruction, out of the miry clay; He set my feet upon a rock... He put a new song in my mouth.'",
        noteX: 82,
        noteY: 10,
        targetX: 58,
        targetY: 20,
        arrowD: "M 82 10 Q 70 12 58 20"
      },
      {
        id: 3,
        short: "Career: Contemporary Dance Teacher",
        category: "Aspirational Vision",
        extended: "Kaitlyn's deepest professional aspiration is to teach contemporary, modern, and jazz dance, combining movement with soulful worship.",
        noteX: 16,
        noteY: 26,
        targetX: 42,
        targetY: 40,
        arrowD: "M 16 26 Q 28 32 42 40"
      },
      {
        id: 4,
        short: "Favourite Food: Spicy Chilli",
        category: "Culinary Comfort",
        extended: "Kaitlyn loves a bold culinary kick! Hearty homemade dishes containing spicy, warming chilli are her absolute food favorites.",
        noteX: 16,
        noteY: 42,
        targetX: 41,
        targetY: 52,
        arrowD: "M 16 42 Q 28 46 41 52"
      },
      {
        id: 5,
        short: "Bucket list: Holy Land, Israel",
        category: "Faith Pilgrimage",
        extended: "To visit the landmarks in Israel—tracing sacred steps, walking the paths of the patriarchs, and studying geography of the Bible live.",
        noteX: 84,
        noteY: 26,
        targetX: 58,
        targetY: 34,
        arrowD: "M 84 26 Q 72 30 58 34"
      },
      {
        id: 6,
        short: "Bible Character: Loyal Ruth",
        category: "Bible Role Model",
        extended: "Deeply captured by Ruth's courage, unshakeable loyalty, and profound faith of choosing the Lord above her birth heritage.",
        noteX: 84,
        noteY: 42,
        targetX: 58,
        targetY: 48,
        arrowD: "M 84 42 Q 72 45 58 48"
      },
      {
        id: 7,
        short: "Drink: Homemade Lemonade",
        category: "Warm Hospitality",
        extended: "Refreshing, tart, and made from scratch, crisp homemade lemonade is her cozy drink companion during sweet fellowship times.",
        noteX: 84,
        noteY: 58,
        targetX: 58,
        targetY: 62,
        arrowD: "M 84 58 Q 72 60 58 62"
      },
      {
        id: 8,
        short: "Favourite Colour: Vibrant Green",
        category: "Personal Aesthetic",
        extended: "Green is her defining color, reminding her of spring landscapes, growth, renewal, and fresh study days in coastal hills.",
        noteX: 80,
        noteY: 74,
        targetX: 59,
        targetY: 76,
        arrowD: "M 80 74 Q 70 75 59 76"
      },
      {
        id: 9,
        short: "Devotion: Quiet Admin Excellence",
        category: "Discipleship Heart",
        extended: "Kaitlyn brings a quiet excellence, strong operational support, and thorough care to group assignments in our regional community.",
        noteX: 18,
        noteY: 74,
        targetX: 36,
        targetY: 78,
        arrowD: "M 18 74 Q 26 80 36 78"
      }
    ]
  },
  {
    id: 'JAMES',
    name: 'James',
    image: '/assets/images/James.png',
    role: 'Team Member',
    motto: "Christ died for us while we were sinners • Romans 5:8",
    bio: "Born on June 20, 2007 and living in South Africa, James is best described as 'wise... most of the time!' He merges an active athletic drive with a deep love for coffee and fearless Biblical characters.",
    chalkboardWatermark: 'JAMES',
    colorTheme: 'text-[#4C6B7B]/20',
    facts: [
      {
        id: 1,
        short: "Born 20 June 2007 • South Africa",
        category: "Roots & Identity",
        extended: "James represents the spirited Gauteng next-gen, combining intense intellectual study with active peer-to-peer mentoring.",
        noteX: 18,
        noteY: 10,
        targetX: 42,
        targetY: 28,
        arrowD: "M 18 10 Q 30 18 42 28"
      },
      {
        id: 2,
        short: "Verse: Romans 5:8 - Perfect Love",
        category: "Spiritual Anchor",
        extended: "'But God shows His love for us in that while we were still sinners, Christ died for us.' A profound banner of grace over James's life.",
        noteX: 82,
        noteY: 10,
        targetX: 58,
        targetY: 20,
        arrowD: "M 82 10 Q 70 12 58 20"
      },
      {
        id: 3,
        short: "Can't Go Without: Rich Coffee",
        category: "Daily Fuel",
        extended: "James's quintessential staple—a warm cup of fresh coffee is his absolute daily fuel for early morning scriptures and board study.",
        noteX: 16,
        noteY: 26,
        targetX: 42,
        targetY: 40,
        arrowD: "M 16 26 Q 28 32 42 40"
      },
      {
        id: 4,
        short: "Chops & Boerewors Braai",
        category: "Culinary Comfort",
        extended: "A proud proudly South African dish! Nothing comes close to sizzling, direct-fire grid-braaied lamb chops and high-quality local boerewors.",
        noteX: 16,
        noteY: 42,
        targetX: 41,
        targetY: 52,
        arrowD: "M 16 42 Q 28 46 41 52"
      },
      {
        id: 5,
        short: "Favourite Colour: Clean Blue",
        category: "Personal Aesthetic",
        extended: "Deep blue is his calm chosen color, fitting his analytical focus and deliberate, structured communication style.",
        noteX: 84,
        noteY: 26,
        targetX: 58,
        targetY: 34,
        arrowD: "M 84 26 Q 72 30 58 34"
      },
      {
        id: 6,
        short: "Character: Fearless Apostle Paul",
        category: "Bible Role Model",
        extended: "The brilliant intellectual, relentless grit, and fearless focus of Paul serve as James's model for leadership and study of the Word.",
        noteX: 84,
        noteY: 42,
        targetX: 58,
        targetY: 48,
        arrowD: "M 84 42 Q 72 45 58 48"
      },
      {
        id: 7,
        short: "Favourite Book: Acts",
        category: "Scriptural Focus",
        extended: "James is captured by the explosive, bold faith, community-driven sharing models, and big undeniable miracles tracked in the Book of Acts.",
        noteX: 84,
        noteY: 58,
        targetX: 58,
        targetY: 62,
        arrowD: "M 84 58 Q 72 60 58 62"
      },
      {
        id: 8,
        short: "Best Described: Wise... most times!",
        category: "Core Character",
        extended: "His self-aware, playful description: 'wise... most of the time!', combining a standard of maturity with high sports humor and warmth.",
        noteX: 80,
        noteY: 74,
        targetX: 59,
        targetY: 76,
        arrowD: "M 80 74 Q 70 75 59 76"
      },
      {
        id: 9,
        short: "Discipleship: Focus & Discipline",
        category: "Discipleship Heart",
        extended: "James maintains the rhythm of study and competitive sports devotion in our team, keeping brothers focused and unified.",
        noteX: 18,
        noteY: 74,
        targetX: 36,
        targetY: 78,
        arrowD: "M 18 74 Q 26 80 36 78"
      }
    ]
  },
  {
    id: 'CAELYN',
    name: 'Caelyn',
    image: '/assets/images/Caelyn.png',
    role: 'Team Member',
    motto: "Inseparable from God's love • Romans 8:38–39",
    bio: "Born on August 10, 2007 in Durban, Caelyn is a set-apart, called, and rooted young disciple. Extremely close with her parents as an only child, she lives out her calling with vibrant joy, tasty cooking, and beautiful worship.",
    chalkboardWatermark: 'CAELYN',
    colorTheme: 'text-[#CE9EB9]/25',
    facts: [
      {
        id: 1,
        short: "Born 10 August 2007 • Durban, SA",
        category: "Roots & Identity",
        extended: "A proud Durban girl, Caelyn brings warm coastal joy and deep commitment to local youth study and peer counseling.",
        noteX: 18,
        noteY: 10,
        targetX: 42,
        targetY: 28,
        arrowD: "M 18 10 Q 30 18 42 28"
      },
      {
        id: 2,
        short: "Verse: Romans 8:38–39",
        category: "Spiritual Anchor",
        extended: "'For I am convinced that neither death nor life, nor any powers, neither height nor depth... will be able to separate us from the love of God that is in Christ Jesus...'",
        noteX: 82,
        noteY: 10,
        targetX: 58,
        targetY: 20,
        arrowD: "M 82 10 Q 70 12 58 20"
      },
      {
        id: 3,
        short: "Three Words: Set-apart, Called, Rooted",
        category: "Core Character",
        extended: "Caelyn's life focus is defined by three simple but profound weights: Set-apart for His purposes, Called into service, and Rooted in Truth.",
        noteX: 16,
        noteY: 26,
        targetX: 42,
        targetY: 40,
        arrowD: "M 16 26 Q 28 32 42 40"
      },
      {
        id: 4,
        short: "Pasta Lover: Any Type!",
        category: "Culinary Comfort",
        extended: "Caelyn's absolute comfort food is pasta—every shape, style, and sauce can spark incredible culinary joy in her heart.",
        noteX: 16,
        noteY: 42,
        targetX: 41,
        targetY: 52,
        arrowD: "M 16 42 Q 28 46 41 52"
      },
      {
        id: 5,
        short: "Bucket list: Travel & Food Tour",
        category: "Aspirational Vision",
        extended: "Caelyn aspires to travel the world, tasting various unique traditional foods and learning diverse beautiful cultures directly.",
        noteX: 84,
        noteY: 26,
        targetX: 58,
        targetY: 34,
        arrowD: "M 84 26 Q 72 30 58 34"
      },
      {
        id: 6,
        short: "Home Joy: Cook & Worship with Parents",
        category: "Home & Joy",
        extended: "Being an only child, Caelyn shares a gorgeous close bond with her parents—they cook together and dwell in heartfelt home worship.",
        noteX: 84,
        noteY: 42,
        targetX: 58,
        targetY: 48,
        arrowD: "M 84 42 Q 72 45 58 48"
      },
      {
        id: 7,
        short: "Bible: James, Romans, 1 Cor",
        category: "Scriptural Focus",
        extended: "Caelyn loves studying James's practical trials of faith, Romans' doctrines of grace, and 1 Corinthians' guide to Christ-like love.",
        noteX: 84,
        noteY: 58,
        targetX: 58,
        targetY: 62,
        arrowD: "M 84 58 Q 72 60 58 62"
      },
      {
        id: 8,
        short: "Colour: Royal Blue",
        category: "Personal Aesthetic",
        extended: "A majestic royal blue is Caelyn's favorite color, matching her set-apart, dynamic, and joyous outlook on life.",
        noteX: 80,
        noteY: 74,
        targetX: 59,
        targetY: 76,
        arrowD: "M 80 74 Q 70 75 59 76"
      },
      {
        id: 9,
        short: "Service: Youth & Music Leader",
        category: "Discipleship Heart",
        extended: "Caelyn brings unshakeable enthusiasm to our gatherings, leading regional events with absolute warmth and deep sibling closeness.",
        noteX: 18,
        noteY: 74,
        targetX: 36,
        targetY: 78,
        arrowD: "M 18 74 Q 26 80 36 78"
      }
    ]
  }
];

export default function CohortSection() {
  const [selectedMemberId, setSelectedMemberId] = useState<string>('ANDREW');
  const [activeFactIndex, setActiveFactIndex] = useState<number>(0);

  const selectedMember = COHORT_DATA.find(m => m.id === selectedMemberId) || COHORT_DATA[0];
  const facts = selectedMember.facts;
  const currentFact = facts[activeFactIndex] || facts[0];

  const handleSelectMember = (id: string) => {
    setSelectedMemberId(id);
    setActiveFactIndex(0);
  };

  return (
    <div id="team-spotlight-section" className="space-y-12 py-16 border-t border-[#EADCC2]/40 bg-zinc-50/10">
      
      {/* Section Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto px-4">
        <span className="inline-flex items-center space-x-2 px-3 py-1 bg-[#9A7D3C]/10 border border-[#9A7D3C]/20 rounded-full text-xs font-bold tracking-widest text-[#9A7D3C] uppercase text-center justify-center">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>The Sovereign Seed</span>
        </span>
        <h2 className="font-serif text-3xl md:text-5xl text-[#1C1917] tracking-tight leading-tight">
          TEAM MEMBERS
        </h2>
        <p className="text-sm md:text-base text-[#1C1917]/70 font-light font-serif">
          Grounded young disciples walking out their calling under shared values, intentional study, and community service.
        </p>
      </div>

      {/* Grid Filter/Selector Tabs for All 8 Members */}
      <div className="w-full max-w-2xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-[#FAF7EF] border border-[#E9D5B8]/80 rounded-2xl shadow-2xs">
          {COHORT_DATA.map((member) => (
            <button
              key={member.id}
              onClick={() => handleSelectMember(member.id)}
              className={`py-2 px-1 text-center rounded-xl font-serif text-[11px] md:text-xs font-bold tracking-wider uppercase transition-all cursor-pointer truncate ${
                selectedMemberId === member.id
                  ? 'bg-[#1C1917] text-[#FAF7EF] shadow-xs'
                  : 'text-[#1C1917]/75 hover:bg-[#FAF7EF]/60 hover:text-[#1C1917]'
              }`}
            >
              {member.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main interactive spotlight card */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-[#FAF7EF]/40 border border-[#E9D5B8]/60 p-4 sm:p-6 md:p-8 rounded-[1.5rem] sm:rounded-[3rem] shadow-2xs space-y-8">
          
          {/* Header Row of the spotlight */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pb-6 border-b border-[#E9D5B8]/50">
            
            <div className="md:col-span-4 lg:col-span-3">
              <span className="text-[10px] tracking-[0.25em] text-[#9A7D3C] font-black uppercase block mb-1">
                {selectedMember.role}
              </span>
              <h3 className="font-serif text-xl md:text-2xl font-black text-[#1C1917] leading-none uppercase">
                {selectedMember.name}
              </h3>
              <p className="text-xs text-[#9A7D3C] font-semibold mt-1 italic">
                &ldquo;{selectedMember.motto}&rdquo;
              </p>
            </div>
            
            <div className="md:col-span-8 lg:col-span-9">
              <p className="text-xs md:text-sm text-[#1C1917]/85 font-light leading-relaxed border-l-2 border-[#9A7D3C] pl-6 py-1 font-serif">
                {selectedMember.bio}
              </p>
            </div>
          </div>

          {/* Interactive Fact diagram & selectors */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* LEFT SIDE: Words & interactive list */}
            <div className="lg:col-span-4 flex flex-col justify-between py-2 space-y-4">
              <div>
                <span className="text-[9px] font-black text-[#9A7D3C] tracking-wider uppercase block mb-1">TEAM HIGHLIGHT INDEX</span>
                <h4 className="font-serif text-base text-[#1C1917] font-bold">Interactive Records</h4>
                <p className="text-xs text-[#1C1917]/60">
                  Select any point to trace its handwritten target on {selectedMember.name}&apos;s chalkboard portrait.
                </p>
              </div>

              {/* Items column list */}
              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
                {facts.map((fact, idx) => {
                  const isActive = activeFactIndex === idx;
                  return (
                    <button
                      key={fact.id}
                      onClick={() => setActiveFactIndex(idx)}
                      className={`w-full p-3 rounded-xl text-left border text-xs transition-all cursor-pointer flex items-center gap-3 relative overflow-hidden group ${
                        isActive 
                          ? 'bg-[#1C1917] border-[#1C1917] text-[#FAF7EF] shadow-md' 
                          : 'bg-white border-[#E9D5B8]/60 text-[#1C1917]/85 hover:border-[#9A7D3C]/40 hover:bg-[#FAF7EF]/40'
                      }`}
                    >
                      {/* Active indicator bar */}
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? 'bg-[#9D8E5F]' : 'bg-[#EADCC2]/80 group-hover:bg-[#9A7D3C]'}`} />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-0.5">
                          <span className={`text-[8px] font-black uppercase tracking-wider ${isActive ? 'text-[#9A7D3C]' : 'text-[#1C1917]/50'}`}>
                            {fact.category}
                          </span>
                          {isActive && (
                            <span className="text-[7px] bg-[#9D8E5F]/35 text-[#FDF9F7] px-2 py-0.5 rounded uppercase font-mono leading-none">
                              Active Path
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-normal leading-snug truncate text-[#1C1917]/90">
                          {fact.short}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT SIDE: The High-Fidelity Interactive Visual Board */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
              
              {/* Outer Board Frame */}
              <div className="w-full aspect-[4/5] bg-[#9D8E5F] border-4 sm:border-8 border-double border-[#72643a] rounded-[1.5rem] sm:rounded-[2.5rem] relative overflow-hidden flex flex-col justify-between p-3 sm:p-4 md:p-6 shadow-lg select-none">
                
                {/* Vintage Sketch Board Background items */}
                <div className="absolute inset-0 bg-radial from-[#B0A170]/10 to-[#807243]/20 pointer-events-none" />
                
                {/* Large handwritten bubble watermark in the middle backdrop */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                  <span className={`font-serif font-black tracking-widest text-[16vw] lg:text-[9rem] select-none uppercase transition-colors text-[#1C1917]/5`}>
                    {selectedMember.chalkboardWatermark}
                  </span>
                </div>

                {/* Centered High Resolution portrait */}
                <div className="absolute top-[8%] bottom-[20%] left-[20%] right-[20%] sm:top-[12%] sm:bottom-[18%] sm:left-[26%] sm:right-[26%] rounded-xl sm:rounded-2xl overflow-hidden border border-dashed border-[#FDFBF7]/30 shadow-2xl z-10 bg-[#FAF7EF]/5 flex flex-col">
                  <div className="flex-1 w-full relative overflow-hidden">
                    <img 
                      src={selectedMember.image}
                      onError={(e) => {
                        // Fallback in case they haven't uploaded images for other members yet
                        (e.target as HTMLImageElement).src = "/assets/images/The_Twelve_Logo preview.png";
                      }}
                      className="w-full h-full object-cover grayscale-[15%] hover:scale-105 transition-transform duration-700" 
                      alt={selectedMember.name} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                  {/* Full Name display centered inside the profile view */}
                  <div className="bg-[#1C1917]/95 text-[#FAF7EF] py-1 md:py-2 px-1 md:px-3 text-center border-t border-[#FAF7EF]/10 font-serif text-[10px] sm:text-xs font-bold uppercase tracking-widest truncate">
                    {selectedMember.name}
                  </div>
                </div>

                {/* SVG Connecting Hand-Drawn Style Curved Arrows Layer */}
                <svg 
                  className="absolute inset-0 w-full h-full pointer-events-none z-20 font-serif" 
                  viewBox="0 0 100 100" 
                  preserveAspectRatio="none"
                >
                  <defs>
                    <marker 
                      id="sketch-team-arrow" 
                      viewBox="0 0 10 10" 
                      refX="6" 
                      refY="5" 
                      markerWidth="7" 
                      markerHeight="7" 
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1 L 9 5 L 0 9 L 2 5 z" fill="#1C1917" />
                    </marker>
                  </defs>

                  {/* Draw arrow matching active selection point */}
                  {activeFactIndex !== null && facts[activeFactIndex] && (
                    <motion.path
                      key={`${selectedMemberId}-${activeFactIndex}`}
                      d={facts[activeFactIndex].arrowD}
                      stroke="#1C1917"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      fill="none"
                      markerEnd="url(#sketch-team-arrow)"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  )}
                </svg>

                {/* Dynamic Coordinate Highlights on portrait for the selected fact */}
                {activeFactIndex !== null && facts[activeFactIndex] && (
                  <motion.div
                    key={`dot-${selectedMemberId}-${activeFactIndex}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute z-21 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-[#1C1917] rounded-full border border-[#FAF7EF] flex items-center justify-center shadow-lg"
                    style={{ 
                      left: `${facts[activeFactIndex].targetX}%`, 
                      top: `${facts[activeFactIndex].targetY}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FAF7EF] rounded-full animate-ping" />
                  </motion.div>
                )}

                {/* Draw dynamic buttons surrounding portrait */}
                {facts.map((fact, idx) => {
                  const isActive = activeFactIndex === idx;
                  const isLeft = fact.noteX < 50;
                  return (
                    <button
                      key={`btn-${selectedMemberId}-${fact.id}`}
                      onClick={() => setActiveFactIndex(idx)}
                      className={`absolute z-30 max-w-[70px] sm:max-w-[120px] text-center p-0.5 sm:p-1.5 rounded-md sm:rounded-xl transition-all font-serif font-semibold leading-tight text-[5px] xs:text-[6px] sm:text-[8px] md:text-[9px] cursor-pointer shadow-2xs sm:shadow-xs ${
                        isActive 
                          ? 'bg-[#1C1917] text-[#FAF7EF] scale-105 border border-[#1C1917]' 
                          : 'text-[#1C1917] bg-white/10 hover:bg-white/35'
                      }`}
                      style={{
                        left: isLeft ? `${fact.noteX}%` : 'auto',
                        right: !isLeft ? `${100 - fact.noteX}%` : 'auto',
                        top: `${fact.noteY}%`,
                        transform: 'translateY(-50%)'
                      }}
                    >
                      {fact.short.replace(/ • Proudly South African.*/, "").replace(/ (Matthew.*)/, "").replace(/ • .*/, "")}
                    </button>
                  );
                })}

                {/* Chalkboard Footer Quote reflection display */}
                <div className="w-full relative z-30 bg-[#1C1917]/90 text-[#FDF9F7] backdrop-blur-md p-3 md:p-4 rounded-2xl border border-[#FAF7EF]/20 flex items-center gap-3 shadow-md mt-auto">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#9A7D3C] flex-shrink-0 animate-pulse" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[7.5px] font-black uppercase text-[#9A7D3C] tracking-widest block mb-0.5">
                      {currentFact.category} Detail
                    </span>
                    <p className="font-serif italic text-[10px] md:text-xs text-[#EADCC2] leading-tight font-light truncate md:whitespace-normal">
                      &ldquo;{currentFact.extended}&rdquo;
                    </p>
                  </div>
                </div>

              </div>
              
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

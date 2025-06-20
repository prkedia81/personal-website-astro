---
title: Advanced Refreeing Technology
description: Indigenous Goal Line Technology
link: /art
linkUrl: https://dub.sh/art-news-link
bannerImg: https://res.cloudinary.com/dg24rzjez/image/upload/v1750424547/personal-website/projects/A.R.T./ART_Banner_Large_fpmdos.jpg
cardImage: https://res.cloudinary.com/dg24rzjez/image/upload/v1750424522/personal-website/projects/A.R.T./ART_Card_airtdo.png
order: 1
---

**A.R.T (Advanced Refereeing Technology)** is a cost-effective, homegrown goal-line detection system developed in collaboration with the **Indian Football Association** and **Jadavpur University**.

The aim: replace traditional VAR setups—which cost **₹20–25 crores per tournament**—with a smart, streamlined solution that delivers high accuracy for **under ₹50 lakhs**.

## What is ART?

A.R.T helps referees determine whether a goal was scored, using:

- AI-powered **goal-line detection algorithms**
- Dual-camera field setup
- Real-time video analysis and visual feedback

When a referee raises a doubt mid-game:

1. A 10-second video clip is extracted
2. It's analyzed using our software, powered by **YOLOv8**
3. A replay is generated with clear visual indicators — within **2–3 minutes**

## Behind the Scenes

### Field Equipment

- 2× Cameras placed diagonally along the goal line
- Network Video Recorder (NVR)
- Tripods, switches, ~300 meters of Ethernet cable
- Laptop + terminal for processing
- External monitor for review

![System Setup](https://res.cloudinary.com/dg24rzjez/image/upload/v1750423112/personal-website/projects/A.R.T./Field_Set-up_y5mm5s.png)

> "We used everything from advanced computer vision to hardwired network setups. What made this work wasn't expensive gear—it was clever engineering and a lot of trial and error."

### How Fast?

- Video cropping: ~1–2 min
- Frame extraction: ~15 sec
- Prediction and goal analysis: ~1 min
- Frame-to-video output: ~15 sec
- **Total time: ~2–3 minutes** from query to decision

## The Rain Test

Our first real field test was supposed to be a simple proof-of-concept. We picked a local ground in Kolkata, set up our cameras, and were ready to test. Then the monsoon decided to show up.

I remember standing there, watching our carefully positioned cameras get absolutely drenched. The Ethernet cables were running through puddles, and I was trying to keep our laptop dry under a makeshift plastic cover. That's when it happened.

I was adjusting one of the camera mounts when I felt this sharp jolt through my hand. The rain had created a perfect path for electricity from our power source to the metal tripod. I literally got electrocuted while trying to save our equipment. My sandal broke in the process of me jumping back, and I spent the next hour testing our system barefoot in ankle-deep water.

But here's the thing—our system actually worked. Even in that chaos, we managed to capture and analyze a few test shots. The livestreaming team from the local channel who were there to document our test ended up becoming our biggest supporters. They let us use their equipment to dry our cables, and we spent the next few hours huddled under their tent, watching our AI process footage while the rain poured around us.

![Field Test](https://res.cloudinary.com/dg24rzjez/image/upload/v1750423263/personal-website/projects/A.R.T./On-ground_testing_hrrquc.png)

## Media Recognition

Getting featured in the news was surreal. The Indian Football Association organized a **major press conference** where we had to present A.R.T to the entire football community.

The venue was packed with journalists, football officials, and even some former players. I remember walking up to the podium for the demo. Here we were, students, presenting technology that could potentially revolutionize how football is officiated in India.

The presentation went better than I expected. When we showed the cost comparison—₹25 crores vs ₹50 lakhs—you could hear the gasps in the room. One journalist actually stood up and asked if we were sure about our numbers. That's when we knew we had something special.

The Q&A session was intense. Football officials were asking technical questions about accuracy, referees wanted to know about ease of use, and journalists were curious about the timeline for implementation. we remember one senior official asking if we'd tested it in real match conditions, and we had to tell him about our rain-soaked field test. The whole room laughed when we mentioned getting electrocuted.

After the press conference, we were surrounded by reporters. The Times of India piece came the next day. Then Zee 24x7 wanted their own features. They sent a crew to our university lab, and we had to set up our entire system for them. I was terrified something would go wrong during the demo. But when our AI successfully detected a goal in the test footage, the cameraman actually cheered.

![Media Recognition](https://res.cloudinary.com/dg24rzjez/image/upload/v1750423351/personal-website/projects/A.R.T./News_Coverage_trtadx.png)

<video width="100%" controls style="margin-bottom: 30px;">
  <source src="https://res.cloudinary.com/dg24rzjez/video/upload/v1750423110/personal-website/projects/A.R.T./Demo_Video_eze0yi.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## What's Next?

A.R.T is set to undergo **live match trials at the Calcutta Football League**, in collaboration with the Indian Football Association.

These trials will help us validate:

- Accuracy under real conditions
- Ease of referee usage
- System reliability during live play

## Why It Matters

Traditional goal-line tech is built for billion-dollar leagues. A.R.T is built for **everyone else**.

This project proves that:

- Indigenous solutions can meet global standards
- University-industry collaboration works
- Smart tech doesn't always have to be expensive

> "Refereeing support shouldn't be limited to the World Cup. If football is for everyone, then technology should be too."

Working on A.R.T has been one of my most rewarding experiences — not just for the technical challenge, but for the sheer impact this could have on Indian sport.

If you're from a football federation or league and want to explore deploying A.R.T — feel free to reach out.

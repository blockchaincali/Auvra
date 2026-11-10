# The Night the Animals Held the Party — Animated Video Plan

Nov 10, 2026 · @0xgeneral

## Overview

One animated read-along video of Chinwendu Blessing’s picture book, about 3 minutes long, 16:9 for YouTube, made for her with her agreement. The book’s own illustrations become the first frame of every shot, so the characters look exactly like the book.

| Item | Decision |
| --- | --- |
| Source | 15-page interior PDF: title spread, 12 story spreads (pages 2–13), “Let’s Talk / Let’s Play” (page 14), author page and The End (page 15) |
| Format | 16:9, 1920×1080, 24 fps, H.264 + AAC, about 3:00 |
| Audience | Children 3–7 and the adults reading with them |
| Narration | AI voice through Orbio, reading the book text word for word |
| On-screen text | The book text as large read-along captions, added in the edit |
| Scenes | Title, 12 story scenes, a short “Let’s Talk” bonus, The End |
| Shots | 27 short animated shots (2–3 per scene) |
| Budget | About $12 (Veo Lite) to $42 (Kling) from the Orbio balance, decided after a one-shot test; hard cap $45 |

**Not animated:** the author’s photo on page 15 (a real person) and the copyright page. The author credit appears as text on the title card and the end card.

## Pipeline and production rules

Record the narration first, then cut every shot to fit it. That order means no paid clip is generated at the wrong length.

### Steps

1. **Extract the art.** Render each PDF page at 300 dpi. Each page is a two-page spread (about 2.5:1). Crop the region named in the shot list.
2. **Make clean plates (Nano Banana 2.1, `/images`).** For every crop, send it as `input_references` with: “Remove all text and the dark text panel. Repaint that area as a seamless continuation of the same painting, same style, same lighting. Output 16:9. Do not change any character.” These clean 16:9 plates become the first frames. Never animate a frame that still contains text.
3. **Approval gate 1:** send all clean plates as one numbered contact sheet. Nothing is animated until approved.
4. **Narration (see Narration).** Generate the whole script line by line, measure each line’s length, and set every shot’s length to cover its narration plus 0.5–1 second of breathing room.
5. **Animate.** Character shots: Kling 3.0 Pro, `frame_images` first\_frame = the clean plate, 16:9, 5s (or 10s where the shot list says so), `generate_audio: true`. Scenery shots with no characters: Veo 3.1 Lite, 16:9, audio on.
6. **Edit.** Lay the narration on the timeline, place the clips under it, crossfade scenes with 0.5s dissolves, add the captions and title cards, mix ambient sound at about −18 dB under the narration, export 1920×1080, −14 LUFS.

### Prompt rules

- Motion prompts describe **motion and sound only**. The plate already holds the look.
- **Gentle motion** suits a bedtime story: slow camera drifts, swaying lanterns, twinkling fireflies, blinking eyes, ears and whiskers twitching, soft dancing. No fast cuts and no shaky camera.
- **No talking mouths.** The narrator speaks every line, so characters smile, laugh, gasp or sing with closed or softly open mouths. Add to every Kling prompt: “no spoken words, no voices, no lip-sync”.
- **Sound from Kling is ambient only:** crickets, a soft breeze, the stream, rustling leaves, distant party music. Add: “no dialogue, no narration, no singing words”.
- **Never change a design.** Do not add, remove or recolour characters. Rosie always has her pink bow; Milo is always light brown with big pink ears.
- **No text in any generated frame.** Titles and captions are added in the edit only.

### Captions (read-along)

Show the book text sentence by sentence as the narrator reads it: a rounded font (such as Nunito Bold), cream text with a soft dark outline, bottom fifth of the screen, at most two lines on screen. Highlight the book’s gold words (Milo, Rosie, Big Brown Bear, the sound words) in warm gold.

## Characters and style

The book already defines every character; these descriptions are for checking plates and clips, not for redesigning anyone.

**Style:** warm, glowing 3D storybook look (soft fur, big expressive eyes), night forest under a huge full moon, deep blue sky, golden lanterns and fairy lights, fireflies, red-capped mushrooms, white and pink flowers, a gentle waterfall and stream.

| Character | Look (from the book) | Role |
| --- | --- | --- |
| **Milo** | Small light-brown mouse, big round pink ears, pink tail, big dark eyes; holds an acorn cap from page 10 on | Hero; shy, then finds his tiny beat |
| **Rosie Rabbit** | Cream rabbit with a pink bow on her ear; later a white flower crown; a small brown satchel when inviting | Party planner, kind and bouncy |
| **Big Brown Bear** | Large brown bear, light muzzle, gentle smile | Big dancer who helps Milo |
| Deer (fawn) | Light-brown fawn with white spots, a white flower on one ear | Friend |
| Squirrel | Red-orange squirrel with a big bushy tail | Friend |
| Owl | Brown-and-cream owl with big yellow eyes, in a tree nest | Friend |
| Frogs (2) | Bright green frogs; play drums and a little guitar | Band |
| Fox, raccoons, hedgehog, crickets | As drawn: orange fox, grey raccoons, brown hedgehog, crickets with fiddles | Party crowd |

**Size rule:** Milo is always tiny next to the others; Bear is always the biggest. This contrast is the story.

**Locations:** the moonlit stream and rock (page 2); Rosie’s mossy log and the burrow-and-nest tree (page 3); the party clearing with the big tree, lanterns, bunting and a food table (pages 5–13).

## Narration

One warm narrator reads the whole book, word for word, slowly enough for a child to follow (about 120–130 words a minute). The narrator gives Rosie, Bear and Milo a light voice change for their lines, not separate voices.

### Voice

- **Model order:** check the Orbio catalogue (a free call) and use the first that is available and priced: ElevenLabs, then Gemini TTS, then `gpt-4o-mini-tts`. If none is available, stop and report; do not use a robotic fallback.
- **Voice:** a warm, gentle adult female storyteller, soft British accent, smiling tone, calm bedtime pace. Style instruction for models that accept one: “Warm, gentle bedtime storyteller reading to a young child. Unhurried, smiling, expressive on the sound words, soft on the quiet moments.”
- **Test first:** generate the opening line only, report the cost and the voice name, and wait for approval before generating the rest.
- **Pauses:** 0.6s between sentences, 1.5s between scenes. Read the sound words (“Blink, blink, blink!”, “THUMP!”, “Tick-tick. Tiptoe!”) with energy.

### Script (generate one file per numbered line)

| # | Scene | Narration (verbatim) |
| --- | --- | --- |
| N0 | Title | The Night the Animals Held the Party. Written by Chinwendu Blessing. |
| N1 | 1 | In the heart of the Whispering Forest, a little mouse named Milo loved quiet nights like this. The moon was full and bright, lighting up the trees, the flowers and the gentle stream. Milo took a deep breath and looked up. |
| N2 | 2 | Rosie Rabbit bounced onto a mossy log. “A moonlight party!” she cried. She wrote invitations on green leaves and hurried from burrow to nest to tree. “Come one, come all! There’s room for everyone!” |
| N3 | 3 | The next day, Rosie set out to invite all her woodland friends to the magical moonlight party. She hopped from friend to friend, sharing a leaf-shaped invitation with a big smile. Everyone was excited! The forest was getting ready for a very special night. |
| N4 | 4 | As the sun began to set, the woodland friends arrived at the clearing. They hung lanterns, tied flower garlands and decorated the trees with glowing lights. Everyone worked together to make the forest look magical for the moonlight party. |
| N5 | 5 | Blink, blink, blink! Fireflies flickered above the grass. Crickets played their fiddles. Frogs sang from their lily-pad stage. Tap-tap! Hop-hop! Swish-swish! The moonlight party had begun. |
| N6 | 6 | Milo was so happy to see everyone dancing. He hopped into the circle too, but the bigger animals moved so fast and made such big steps! Milo tried his best to keep up, but it felt a little too loud and a little too big. He stepped back and watched for a moment, feeling shy. THUMP! Bear’s big paw landed nearby. Milo scurried back beside the mushrooms. |
| N7 | 7 | Milo sat quietly by the mushrooms, watching everyone dance. The music was so loud and the steps were so big. Milo felt small. But even though he felt shy, he still loved seeing his friends happy. |
| N8 | 8 | Big Brown Bear noticed him. “Would you like to dance?” he asked. Milo stared at the crowded clearing. “I can’t make a big enough step.” Bear sat down until they were eye to eye. “Who says dancing has to be big?” |
| N9 | 9 | “Let’s make room!” called Rosie. The friends stepped back to form a circle. Milo’s whiskers twitched. Then he scampered into the middle, tapping his acorn cap. Tick-tick. Tiptoe! Tick-tick. Tiptoe! |
| N10 | 10 | Soon, other animals heard the tiny beat. Tap. Tap-tap. A little rabbit clapped. A squirrel shook some leaves. The frogs made a soft drum. Together, their small sounds filled the clearing. Milo smiled. His tiny beat was a big part of the party after all! |
| N11 | 11 | Soon the whole forest joined in. Big Brown Bear danced with gentle steps. Rosie twirled beside Milo. The rabbits hopped. The foxes spun. The hedgehog clapped. Even the frogs kept the beat on their drums. Milo’s tiny rhythm had brought everyone together. A moonlight party for all! |
| N12 | 12 | The moon began to sink, and the party came to an end. Everyone gathered around Milo. “Thank you for the dance!” they said. Milo smiled, feeling warm and happy inside. Even a small mouse can make a big, happy day. And the forest felt a little brighter. |
| N13 | Bonus | Let’s talk about the story. Why did Milo feel left out at the party? What did Bear do to help Milo? How can you make room for someone who feels small or shy? |
| N14 | End | The End. |

At this pace the narration runs about 2:50–3:10.

## Shot list

27 animated shots covering about 3:15 of picture. “Page” is the PDF page; “left/right” is the half of the spread to crop before making the clean plate. Append the prompt rules (no voices, ambient sound only, no text) to every motion prompt.

| Shot | Narr. | Source crop | Model, length | Motion prompt |
| --- | --- | --- | --- | --- |
| T | N0 | Page 1 right (cover art, title removed) | Kling 5s | Milo gazes up at the moon and smiles; the lantern above sways gently; fireflies drift; slow push-in. Sound: night breeze, crickets. |
| 1a | N1 | Page 2 right (moon, waterfall, stream) | Veo Lite 5s | Slow drift toward the full moon; the waterfall flows; the stream sparkles; fireflies blink. Sound: soft waterfall, crickets. |
| 1b | N1 | Page 2 left (Milo on the mossy rock) | Kling 10s | Milo sits on the rock, takes a slow deep breath, his chest rising, whiskers twitching, then lifts his head to look up at the sky with wonder; fireflies float past; flowers sway. Sound: crickets, gentle breeze. |
| 2a | N2 | Page 3 left (Rosie at the log with leaves) | Kling 5s | Rosie bounces happily and writes on a green leaf with a twig, her ears bouncing; she holds the leaf up proudly. Sound: rustling leaves, a happy little hop. |
| 2b | N2 | Page 3 right (delivering to owl and mouse) | Kling 10s | Rosie hops up and hands a leaf to the owl in its nest, who takes it and blinks happily; below, the little mouse at the burrow door waves a leaf; the waterfall flows behind. Sound: soft hoots, hopping, the stream. |
| 3a | N3 | Page 4 left and centre (Bear and Rosie) | Kling 5s | Rosie hands a glowing leaf invitation to Big Brown Bear; Bear takes it gently and smiles wide. Sound: leaves rustling, a happy rumble. |
| 3b | N3 | Page 4 right (fawn, squirrel, owl, frogs) | Kling 10s | The fawn, squirrel, owl and two frogs each hold up their leaf invitations, look at each other and bounce with excitement; the owl flaps its wings once; lanterns glow in the tree house. Sound: excited chirps and croaks, a breeze. |
| 4a | N4 | Page 5 left (Bear hangs a lantern, Milo with flowers, squirrel) | Kling 10s | Bear reaches up and hangs a glowing lantern on the tree; Milo carries a bunch of white flowers; the squirrel arranges pine cones; lantern light flickers warmly. Sound: lantern creak, rustling, crickets. |
| 4b | N4 | Page 5 right (fawn with garland, frogs at the food table) | Kling 5s | The fawn hangs a lantern on the bunting; the frogs hop beside the food table; the owl watches from its branch; bunting sways. Sound: gentle bustle, a soft croak. |
| 5a | N5 | Page 6, crickets and fireflies on the grass (lower right) | Kling 5s | Close view: fireflies blink on and off above the grass; crickets lift their tiny fiddles and play. Sound: firefly twinkle, cricket fiddles. |
| 5b | N5 | Page 6 full spread | Kling 10s | The party begins: Bear, Rosie, Milo, the fawn, squirrel, fox and raccoons dance happily; frogs drum; lanterns swing; slow camera drift left to right. Sound: cheerful forest music without words, laughter-like chirps. |
| 6a | N6 | Page 7 full spread (big dance, tiny Milo) | Kling 10s | Big animals dance with big fast steps around tiny Milo, who tries to copy them, hopping left and right, a little overwhelmed; bunting and lanterns swing. Sound: lively music, stomping steps. |
| 6b | N6 | Page 7, Bear’s foot and Milo by the mushrooms (centre lower) | Kling 5s | Bear’s big paw thumps down near Milo with a little puff of dust; Milo jumps and scurries back beside the red mushrooms. Sound: a deep THUMP, a tiny squeak, quick little footsteps. |
| 7a | N7 | Page 8 left (Milo sitting by the mushrooms) | Kling 10s | Milo sits quietly on the mossy rock hugging his knees, watching the dance; his ears droop a little, then he smiles softly; the mushrooms glow. Sound: party music muffled and distant, crickets close. |
| 7b | N7 | Page 8 right (the dance under the moon) | Kling 5s | In the distance, the animals dance joyfully by the stream under the huge moon; lanterns sway. Sound: lively music, the stream. |
| 8a | N8 | Page 9 full spread (Bear sits down near Milo) | Kling 10s | Big Brown Bear notices Milo, walks over gently and slowly sits down so his face is low near Milo; the other animals watch kindly from around the clearing. Sound: music fades softly, a gentle rumble. |
| 8b | N8 | Page 9, Milo looking up (left of centre) | Kling 5s | Close on Milo looking up at Bear, unsure, then his eyes brighten with hope; his whiskers twitch. Sound: soft crickets. |
| 9a | N9 | Page 10 left (Bear, Rosie, squirrel, frogs) | Kling 5s | Rosie spreads her arms wide and the friends step back to make a big circle; Bear claps his paws together. Sound: shuffling steps, a cheerful murmur. |
| 9b | N9 | Page 10 centre and right (Milo dancing in the circle) | Kling 10s | Milo scampers into the middle and dances on tiptoe, tapping his acorn cap in a tiny rhythm: tap-tap, tiptoe; the friends around the circle watch delighted and start to sway. Sound: tiny taps on the acorn, soft tiptoe steps, a hush, then gentle claps. |
| 10a | N10 | Page 11 centre (Milo with acorn, Bear tapping a rock) | Kling 10s | Milo taps his acorn cap; Bear gently taps a stone with one finger in the same rhythm, grinning; a little glow pulses with each tap. Sound: tap, tap-tap on acorn and stone. |
| 10b | N10 | Page 11 left (rabbit clapping, squirrel with leaves) | Kling 5s | The little rabbit claps in time; the squirrel shakes a bunch of leaves like a shaker. Sound: soft claps, leafy rustle in rhythm. |
| 10c | N10 | Page 11 right (frogs drumming on leaves) | Kling 5s | The frogs tap soft drums made of leaves, smiling, bobbing their heads to the beat. Sound: soft little drum beats. |
| 11a | N11 | Page 12 full spread | Kling 10s | The whole forest dances together: Bear dances with gentle steps, rabbits hop, foxes spin, the hedgehog claps, frogs drum, crickets fiddle; lanterns swing; slow camera rise. Sound: joyful music without words, rhythmic taps. |
| 11b | N11 | Page 12 centre lower (Rosie and Milo) | Kling 5s | Rosie twirls beside Milo, who dances and taps his acorn; both laugh with closed smiles. Sound: tapping beat, happy squeaks. |
| 12a | N12 | Page 13 right (the group hug) | Kling 10s | Everyone gathers close around Milo in a warm hug; Bear wraps his arms around them all; eyes close happily; fireflies float up. Sound: music winds down softly, contented sighs, crickets. |
| 12b | N12 | Page 13 far right (moon over the lake) | Veo Lite 5s | The moon slowly sinks toward the lake; fireflies drift; lanterns dim. Sound: quiet night, gentle water. |
| E | N14 | Page 15 right (Milo on the log, “The End” removed) | Kling 5s | Milo yawns, smiles and waves sleepily; the moon glows; fireflies drift. Sound: a soft yawn-like squeak, crickets. |

**Bonus (N13, no generation):** show page 14 as it is (it is meant to be read) with a slow zoom from the “Let’s Talk About the Story” page across to “Let’s Play!”, done in the edit for free.

**Title and end cards (edit text):** on shot T, the title “The Night the Animals Held the Party” and “Written by Chinwendu Blessing” in the book’s title colours; on shot E, “The End” in gold script.

## Budget, QA and hand-off

All-Kling costs about $42; a hybrid costs about $20; all Veo Lite costs about $12. A $3 A/B test on one shot decides which, before the big spend.

| Route | What uses Kling | Animation cost | Total with plates and voice |
| --- | --- | --- | --- |
| All Kling | Every character shot (185s at $0.21/s) | about $39 | **about $42** |
| Hybrid (recommended if Veo Lite passes) | Only the 6 big moments: 6a, 6b, 9b, 10a, 11a, 12a (55s) | about $12 Kling + $7 Veo | **about $20** |
| All Veo Lite | None (Veo Lite at $0.05/s with audio) | about $10 | **about $12** |

Clean plates cost about $1.20 (about 30 at $0.04) and the narration about $1, depending on Orbio’s TTS price. Veo Lite clips are at most 8 seconds, so a 10s shot becomes 8s in Veo, held or slowed slightly in the edit.

### The A/B test (about $3, after the plates are approved)

Animate shot **1b** (Milo breathes and looks up) twice: Kling 10s and Veo 3.1 Lite 8s, from the same clean plate. Send both side by side with their costs. If Veo Lite keeps Milo’s face and fur on model, use the hybrid route; if it drifts, use all Kling.

### QA checklist (every plate and every clip)

- [ ] No text, letters or text panels left anywhere in the frame.
- [ ] Characters match the book: Rosie’s pink bow, Milo’s pink ears and light-brown fur, Bear clearly the biggest, Milo clearly the smallest.
- [ ] No new characters appear and none disappear mid-shot; no extra limbs, ears or tails.
- [ ] No talking mouths or lip-sync; Kling’s audio has no voices or sung words.
- [ ] Motion is gentle; no camera shake and no sudden cuts.
- [ ] Each shot covers its narration line with 0.5–1s to spare.

### Spending rules

- Hard cap: **$45** for the whole video. Stop and ask before going over.
- Never re-run an animated shot more than once without asking; fix the plate instead when the problem is visual.

### Hand-off instruction for the production session

> Produce an animated YouTube video (16:9, 1920×1080) of the attached children’s book “The Night the Animals Held the Party” by Chinwendu Blessing (made for her, with her agreement), following this plan exactly. Step 1 (cap $2): make the clean 16:9 plates for all 27 shots from the book pages (all text removed, characters unchanged) and send them as one numbered contact sheet for approval. Step 2 (cap $1): check Orbio for a TTS model in the order given, generate only line N0 as a voice test, and report the voice and cost. Step 3 (cap $3, after my approval): run the A/B test on shot 1b. Then, once I choose the route, generate the full narration, animate all shots, edit with read-along captions and title cards, and send me the finished MP4. Hard cap $45 overall; follow the prompt rules and QA checklist.

# The Frozen Maid Is the Ice Queen — Series Bible

Nov 4, 2026 · @0xgeneral

## Series overview

A maid humiliated at a royal winter banquet is secretly Elara, the last heir of the destroyed Ice Kingdom of Nordhal — hiding inside the palace of the woman who ordered her family killed. Season 1 is 16 episodes of about 30 seconds each, every one ending on a cliffhanger.

**Hook (one line for TikTok):** They poured wine on the maid. Then the wine froze.

**Core twist:** ten years ago Queen Mother Isolde paid the Fire General Vorn to burn Nordhal. Sir Rowan, Nordhal’s last knight, smuggled the child Elara out and hid her as a servant in Isolde’s own palace, waiting for the day she could take back her crown.

| Item | Decision |
| --- | --- |
| Genre | Female-led hidden identity + revenge + slow-burn romance, fantasy |
| Audience | 18–35, mainly women; fans of ReelShort/DramaBox revenge and royal fantasy |
| Format | 9:16 vertical, about 30 seconds, 7–8 shots, 1080×1920 export |
| Episodes | 16 (Season 1); a Season 2 hook in the finale |
| Tone | Cinematic, photoreal, romantic tension, satisfying payback every 2–3 episodes |
| Language | English, all characters speak with a British accent |

**Season shape:** episodes 1–4 hide and reveal the secret; 5–8 build the romance and trap Elara; 9–12 escape, loss and the crown; 13–16 the confession, the war and the coronation. Every episode answers the last cliffhanger in its first 3 seconds.

## Production rules

Every shot follows one pipeline: locked character portrait → Nano Banana still → approval → Kling 3.0 Pro animation. These rules come from the Neon Lagos tests and exist to avoid paid re-runs.

### Pipeline

1. **Setup (once per season):** generate every portrait and costume sheet in the Cast bible, and every location plate in the Locations bible. Approve them all before any episode.
2. **Stills:** one Nano Banana 2.1 still per shot, using `input_references` = the character portrait(s) + the location plate. Prompt = the still prompt from the shot list, word for word.
3. **Approval gate:** send all stills of an episode as one numbered contact sheet. Nothing is animated until approved.
4. **Animation:** Kling 3.0 Pro, `frame_images` first\_frame = the approved still, `generate_audio: true`, **duration 4s** (Kling bills 4s minimum; trim in the edit). Establishing shots with no characters use Veo 3.1 Lite, 4s, audio on.
5. **Edit:** stitch in order, trim to 28–32s, burn in subtitles, add the end card, export 1080×1920, 24 fps, H.264 + AAC, −14 LUFS. Export two versions: with the SFX/dialogue mix only (for TikTok sounds) and with a music bed if one is available.

### Prompt rules (apply to every still and motion prompt)

- Always paste each character’s **locked description** from the Cast bible, word for word. Never paraphrase it.
- Name the exact number of people in frame: “exactly two people”. Background crowds are “blurred, out of focus”.
- No readable text anywhere: no signs, letters, banners or inscriptions.
- Eyes stay normal and human unless the shot list says **POWER EYES** (only from Episode 12).
- Ice effects come from Elara’s **hands or the surface she touches**, never from her eyes or mouth.
- Period setting: no modern objects, no zips, no glasses, no electric light. Light is candles, torches, fire, moonlight, daylight.
- Camera: describe one simple move per shot (slow push-in, slow pan, static). Never “the camera passes through / under / around”.
- Dialogue: at most one line per shot, at most 8 words, spoken by one named character, written as: *She says in a soft British accent: “…”*
- Kling motion prompts describe only motion and sound, not appearance (the still already holds the look).

### Background life (every scene with a crowd)

Scenes should feel like a real film: the court watches, whispers, gossips and reacts. Extras are never named characters and never speak clearly on screen.

- **Where:** extras sit in the mid-ground or background, **slightly out of focus**, faces small or turned. Main characters stay sharp in the foreground. Write it as: “exactly two main characters in sharp focus; blurred courtiers in the background”.
- **What they do (pick 1–2 per shot):** ladies whispering behind lace fans, nobles leaning together and glancing over, a servant freezing mid-step with a tray, guards exchanging looks, someone covering a laugh, a man nudging his neighbour, heads turning toward the action.
- **Reactions follow the beat:** laughter when Elara is humiliated; sudden silence and stares when magic appears; gasps and murmurs at reveals.
- **Sound layer (always in the motion prompt):** low murmuring crowd, indistinct whispers, rustling silk, cutlery, then the reaction (laughter, gasps, silence).
- **Gossip cutaways:** in crowd episodes, add one 3-second reaction shot of two extras gossiping (no clear faces needed). At most one whispered line, about 5 words, which the subtitles may show in italics.
- **Limits that protect quality:** no more than 4–6 extras visible in a shot; never put extras in sharp close-up; never ask for crowd actions that need hands touching main characters.

### QA checklist (check every still before approval)

- [ ] Correct number of people; no extra limbs or fingers.
- [ ] Mirror check: Elara’s crescent birthmark is under her **LEFT** eye; Sir Rowan’s eyepatch is over his **RIGHT** eye. If both are on the wrong side, mirror the image (free) instead of regenerating.
- [ ] Costume colours match the colour codes (Visual style guide).
- [ ] Elara’s hair is fully hidden under her headscarf in maid form (until Episode 12).
- [ ] No text, no modern objects, no glowing eyes (unless POWER EYES).
- [ ] The last shot of an episode matches the first shot of the next (same location, same costumes).

### Spending rules

- Hard cap per episode: **$8**. Stop and ask before exceeding it.
- Never regenerate an animated shot more than once without asking. Re-do the still instead when the problem is visual.
- Budget each Kling clip at **$0.84** and each Veo 3.1 Lite clip at **$0.20**.

## Magic system and visual style guide

The world is the winter kingdom of Valdren, a late-Renaissance European court in permanent snow. Ice magic is cold blue and silent; fire magic is orange and loud, so viewers read every clash instantly.

### Magic rules

| Power | Who | How it looks | Limits |
| --- | --- | --- | --- |
| Ice | Elara | Pale blue light; frost spreading in fern-like fractal patterns from her fingertips or anything she touches; liquids freeze solid; visible cold breath around her; faint pale-blue veins glowing on her forearms during strong use | Black iron cuffs block it completely; strong emotion makes it leak (frost on cups, cold breath) |
| Ice, full (from Ep 12) | Elara, Queen form | Same, plus snow swirling around her, an ice-crystal crown, and **POWER EYES**: irises turn pale silver (no beams, no glow spilling out) | Exhausts her; she staggers after big uses |
| Fire | General Vorn | Molten orange cracks glowing in his black gauntlets; flames from his palms; drifting embers; snow melts and steams around him | Water and ice slow it; weaker in deep cold |

### Look

- **Style line (add to every still prompt):** cinematic photoreal film still, 35mm lens, shallow depth of field, soft film grain, high detail, 9:16 vertical.
- **Light:** interiors are warm candlelight and firelight (amber, gold); exteriors are cold moonlight or overcast daylight (steel blue). Ice magic adds pale cyan; fire adds orange.
- **Weather:** snow is always falling or lying outside; breath is visible outdoors.

### Colour codes (costume colours never change)

| Character | Colour | Signature item |
| --- | --- | --- |
| Elara (maid) | Dull grey and white | Brown linen headscarf |
| Elara (queen) | Ice white and pale blue, silver | Ice-crystal crown |
| Prince Cassian | Navy blue and silver | Silver wolf-head cloak pin |
| Queen Mother Isolde | Emerald green and gold | Large emerald on a gold collar necklace |
| Lady Seraphine | Rose pink and pearl | Pearl choker |
| Sir Rowan | Brown and worn steel | Black eyepatch (right eye) |
| General Vorn | Black and crimson | Glowing orange gauntlets |
| Maren | Dark blue | Ring of iron keys on her belt |
| King Aldric | Deep purple and gold | Gold circlet |
| Pip | Moss green | Patched tunic, flat cap |

### Negative list (add to every still prompt)

no text, no letters, no watermark, no modern objects, no extra fingers, no extra people, no glowing eyes, no mirrored features.

## Cast bible

Nine characters, each with one locked description. Paste it word for word into every still prompt they appear in. Generate for each: (a) a front head-and-shoulders portrait on a plain dark grey background, (b) a full-body costume sheet with front, three-quarter and side views. Elara gets both of these twice: maid form and queen form.

### 1. Elara Vael — the maid / the Ice Queen (lead)

- **Locked description (maid):** a 22-year-old woman with fair porcelain skin, a delicate oval face, high cheekbones, pale grey-blue eyes, soft pink lips, a small dark crescent-moon-shaped birthmark just under her LEFT eye; her hair is completely hidden under a plain brown linen headscarf tied at the back of her neck; she wears a plain grey wool servant’s dress with long sleeves and a white linen apron.
- **Locked description (queen, from Ep 12):** the same woman, the same face and crescent birthmark under her LEFT eye, with long straight silver-white hair falling to her waist, an ice-crystal crown of sharp clear spikes, and a fitted ice-white gown with pale blue frost patterns and a long translucent silver cape.
- **Voice:** soft, low and controlled, British accent; turns cold and steady when angry.
- **Personality:** patient, observant, quietly proud. Never begs. Says little; every line lands.
- **Arc:** hides → is discovered → is trapped → loses Rowan → claims her crown → rules.

### 2. Prince Cassian Thorne — the crown prince (love interest)

- **Locked description:** a 27-year-old man, tall and broad-shouldered, light olive skin, black wavy hair to his collar, dark brown eyes, a sharp jaw with short dark stubble, a thin pale scar along the LEFT side of his jaw; he wears a fitted navy-blue military doublet with silver buttons, a black cloak with a dark fur collar fastened by a silver wolf-head pin, and a sword at his hip.
- **Voice:** deep, clipped, commanding British accent; softer only with Elara.
- **Personality:** cold in public, fair, suspicious, secretly lonely; hates his mother’s court games.
- **Arc:** suspects her → protects her → learns the truth about his mother → chooses Elara.

### 3. Queen Mother Isolde Thorne — the villain

- **Locked description:** a 55-year-old woman, pale skin, sharp high cheekbones, cold green eyes, thin red lips, auburn-red hair streaked with grey, worn in a tall braided crown; she wears a deep emerald-green velvet gown with gold embroidery, black lace gloves, and a heavy gold collar necklace set with one large emerald.
- **Voice:** quiet, silky and cold British accent; never raises it until the finale.
- **Personality:** smiling, patient, ruthless; poisons slowly rather than strikes.
- **Arc:** hunts the “witch” → traps Elara → exposed → calls Vorn’s army → arrested.

### 4. Lady Seraphine Ashford — the rival

- **Locked description:** a 23-year-old woman, fair rosy skin, bright blue eyes, a small beauty mark above the RIGHT corner of her lip, golden-blonde hair in long ringlet curls; she wears a rose-pink silk gown with puffed sleeves and a pearl choker necklace.
- **Voice:** sweet, high and sing-song British accent that turns sharp and venomous.
- **Personality:** spoiled, jealous, cruel to servants; Isolde’s niece and Cassian’s intended bride.
- **Arc:** humiliates Elara → frames her → is discarded by Isolde → warns Elara in the war (redemption).

### 5. Sir Rowan Hale — the last knight of Nordhal (mentor)

- **Locked description:** a 60-year-old Black man, dark brown skin, weathered face, short grey hair, a full short grey beard, a black leather eyepatch over his RIGHT eye; he wears worn steel armour under a hooded brown wool cloak, with a faded snowflake crest on his chest plate.
- **Voice:** deep, gravelly, gentle British accent.
- **Personality:** loyal, calm, few words, carries guilt for the night Nordhal fell.
- **Arc:** guards her secret → reveals himself → dies saving her (Ep 11); his last words lead her to the crown.

### 6. General Vorn Kael — the Fire General (true enemy)

- **Locked description:** a 45-year-old man, olive skin, shaved head, a long braided black beard, burn scars on the left side of his neck, amber eyes; he wears heavy black-and-crimson plate armour, a tattered crimson cape, and black gauntlets with glowing molten-orange cracks.
- **Voice:** loud, rough, mocking, British accent.
- **Personality:** brutal, amused, obsessed with capturing the last Frost Heir.
- **Arc:** arrives at the pyre (Ep 9) → kills Rowan → leads the attack → frozen solid (Ep 16), with a Season 2 hint.

### 7. Maren Desai — head maid (ally)

- **Locked description:** a 45-year-old South Asian woman, warm brown skin, sharp dark eyes, black hair streaked with grey in a tight low bun; she wears a dark blue servant’s dress with a white collar and a ring of iron keys on her belt.
- **Voice:** brisk, firm, motherly British accent.
- **Personality:** strict, protective, quietly knows more than she says.
- **Arc:** lies to protect Elara (Ep 2) → secretly keeps the poison vial → produces it as proof (Ep 14).

### 8. King Aldric Thorne — the dying king

- **Locked description:** a 72-year-old man, pale gaunt face, long white beard and white hair, tired blue eyes, a thin gold circlet; he wears a deep purple velvet robe and lies in a canopied bed with heavy gold-and-purple curtains.
- **Voice:** weak, rasping, kind British accent.
- **Arc:** being poisoned by Isolde → recognises Elara’s birthmark (Ep 6) → recovers and crowns her (Ep 16).

### 9. Pip — the stable boy (comic relief, secret-keeper)

- **Locked description:** a 12-year-old boy, freckled pale skin, messy ginger hair under a brown flat cap, big green eyes, a gap-toothed grin; he wears a patched moss-green tunic, brown trousers and muddy boots.
- **Voice:** quick, cheeky London accent.
- **Personality:** nosy, brave, funny; the audience’s eyes.
- **Arc:** discovers the secret (Ep 2) → swears loyalty → guides the escape (Ep 11) → becomes Elara’s squire.

## Locations bible

The whole season uses nine reusable sets. Generate one empty location plate per set (9:16, no people) during setup and pass it as a reference with every still, so rooms look the same in every episode.

| ID | Set | Locked description | Episodes |
| --- | --- | --- | --- |
| L1 | Palace exterior | A vast pale-stone Renaissance palace with tall spires and copper-green domes, every window glowing warm gold, at night, heavy snow falling, a snowy courtyard and iron gates in front | 1, 9, 15 (establishing) |
| L2 | Great Hall | A long candlelit banquet hall with a high vaulted stone ceiling, gold chandeliers full of candles, a long table with silver plates and red wine, a raised high table under navy-and-gold banners with no writing, polished grey stone floor | 1, 7, 14, 16 |
| L3 | Servants’ kitchen | A low stone kitchen with a big open hearth fire, copper pots on hooks, wooden tables with bread and vegetables, steam, warm orange firelight | 2, 3, 7 |
| L4 | Snowy courtyard | An open stone courtyard inside the palace walls, snow on the ground, iron torches on posts, a stone fountain frozen in the middle, the palace walls rising behind, blue moonlight | 5, 9, 10, 15 |
| L5 | Queen Mother’s chambers | A dark luxurious bedchamber in emerald-green velvet and gold, a carved fireplace, a tall gilded mirror, a dressing table with glass perfume bottles, candlelight | 6, 7, 14 |
| L6 | King’s sickroom | A dim royal bedroom with a huge canopied bed in purple and gold, a single window with snow outside, a bedside table with a silver cup and a small green glass vial, low candlelight | 6, 14 |
| L7 | Dungeon | A cold stone dungeon cell, wet black walls, a narrow barred window with falling snow, black iron chains fixed to the wall, a single torch outside the bars | 8 |
| L8 | Frozen lake and ruins of Nordhal | A wide frozen lake under a pale grey sky, snowy pine forest around it, the black burnt ruins of a white ice palace on the far shore, broken frozen towers | 4 (flashback, ruins burning at night), 11, 12, 13 |
| L9 | Stables | A wooden stable at night, horses in stalls, hay, hanging lanterns, a wide door open to falling snow | 2, 3, 11 |

**Flashback rule (Ep 4):** flashback shots use L8 at night with the palace burning, a warm desaturated look and slight blur, so viewers read it as memory.

## Season outline

Sixteen episodes. Each answers the previous cliffhanger in its first shot and ends on a new one. Big payoffs land in Episodes 1, 9, 12 and 16; post Episodes 1–3 together.

| Ep | Title | What happens | Cliffhanger (last shot) | Sets | Cast |
| --- | --- | --- | --- | --- | --- |
| 1 | The Wine and the Frost | At the winter banquet Seraphine forces the maid Elara to kneel and pours wine over her head while the court laughs. Seraphine’s goblet freezes solid in her hand; Cassian stands. | Isolde’s own goblet frosts over. She whispers: “Impossible… the Frost blood is dead.” | L1, L2 | Elara, Seraphine, Cassian, Isolde |
| 2 | The Witch Hunt | Guards line up every maid in the kitchen to find “the witch”. Maren lies to protect Elara. Late at night Pip watches Elara wash cups in the stables trough. | The water freezes around her hands. Pip: “Your hands… they’re ice!” | L3, L9 | Elara, Maren, guards, Pip |
| 3 | The Knight in the Shadows | Elara begs Pip for silence; he swears it on his cap. A hooded man steps out of the dark stable. | Rowan kneels: “Your Majesty. It’s time.” Pip’s jaw drops. | L9 | Elara, Pip, Rowan |
| 4 | The Night Nordhal Burned | Rowan tells the truth. Flashback: Vorn’s fire destroys the ice palace; Rowan carries a small girl (seen from behind) out of the flames; a gold collar with an emerald glints in the firelight. | Elara, back in the present: “The Queen Mother killed my family.” | L8 (night, burning), L9 | Elara, Rowan, Vorn (flashback) |
| 5 | Snow That Doesn’t Melt | Cassian corners Elara in the courtyard. Tension, almost a kiss. He notices snowflakes don’t melt on her skin. | He grabs her wrist; frost spreads over his glove. “I knew it.” | L4 | Elara, Cassian |
| 6 | The Dying King | Elara brings tea to King Aldric and finds a green glass poison vial. The King sees her birthmark: “Nordhal’s child… forgive me.” | The door opens behind her: Isolde, smiling. | L6 | Elara, Aldric, Isolde |
| 7 | The Stolen Pearls | Isolde “rewards” Elara with a post as Seraphine’s maid. Seraphine hides her own pearl choker in Elara’s apron. | Guards tear the apron; pearls spill on the hall floor. Seraphine: “Thief!” | L5, L2 | Elara, Isolde, Seraphine, guards |
| 8 | Iron Chains | Elara is chained in black iron in the dungeon; her frost dies. Seraphine taunts her. Cassian visits secretly with a cloak. | Isolde, outside the bars: “At dawn, the witch burns.” | L7 | Elara, Seraphine, Cassian, Isolde |
| 9 | The Pyre | Dawn in the courtyard. Elara is tied to a pyre; flames rise. Rowan cuts her iron chains; she freezes the entire pyre solid in front of the court. | A voice from the gate: “There you are, little Frost Heir.” General Vorn walks through the snow, which steams around him. | L4 | Elara, Rowan, Isolde, Cassian, Vorn |
| 10 | Fire Meets Ice | First clash: Vorn’s flames against Elara’s ice. She is overpowered. Cassian draws his sword beside her. | Vorn’s fire blast strikes Rowan, who shields her and falls. | L4 | Elara, Vorn, Cassian, Rowan |
| 11 | The Last Knight | Pip leads them out through the stables to the frozen lake. Rowan, dying, gives Elara his snowflake crest: “The crown sleeps beneath the ice.” | Rowan’s hand goes still in hers. Snow falls on his face. | L9, L8 | Elara, Rowan, Pip, Cassian |
| 12 | The Crown Beneath the Ice | Grief-stricken, Elara strikes the lake; the ice splits and the ice-crystal crown rises. Full transformation: headscarf gone, silver-white hair, queen gown. | POWER EYES: her eyes open pale silver; the whole lake freezes in one wave. | L8 | Elara (queen form), Cassian, Pip |
| 13 | The Prince’s Choice | Elara tells Cassian his mother burned Nordhal. Seraphine, who followed them, runs back to warn Isolde. | Cassian: “Then I stand against my mother.” | L8 | Elara, Cassian, Seraphine |
| 14 | The Confession | Back at the palace, Elara and Cassian confront Isolde in her chambers. Maren produces the poison vial. Isolde confesses, laughing; King Aldric hears it from the doorway. | Isolde smashes her emerald; a pillar of fire shoots into the sky — Vorn’s signal. | L5 | Elara, Cassian, Isolde, Maren, Aldric |
| 15 | Fire at the Gates | Vorn’s army attacks. Elara raises an ice wall across the gates. Seraphine, cast aside by Isolde, warns Elara of a hidden dagger. | Isolde lunges with the dagger; Cassian steps in front of it (shoulder wound, no gore). | L1, L4 | Elara, Cassian, Isolde, Seraphine, Vorn |
| 16 | The Ice Queen Rises | Elara freezes Vorn solid into an ice statue. Isolde is arrested. In the Great Hall the recovered King places Nordhal’s crown on Elara’s head; Cassian kneels beside her. | Season 2 hook: in the courtyard, Vorn’s ice statue cracks and one amber eye glows. | L4, L2 | Everyone |

**Violence rule:** no gore anywhere. Wounds are shown as a hand pressed to a shoulder or a dark stain on clothing; deaths are quiet and off-focus. This keeps the series within TikTok’s guidelines.

## Episode 1 — The Wine and the Frost (full shot list)

Nine shots, 30 seconds, about $7.25. In every prompt, replace each tag in square brackets with its locked text: \[ELARA-MAID\], \[SERAPHINE\], \[CASSIAN\], \[ISOLDE\] from the Cast bible, and \[L1\]/\[L2\] from the Locations bible. Then append the style line and the negative list from the Visual style guide.

**References per still:** the portrait(s) of everyone in frame + the location plate.

### Shot 1 — Establishing (Veo 3.1 Lite, 4s, use 3.0s)

- **In frame:** no people.
- **Still prompt:** \[L1\]. Low-angle view across the snowy courtyard toward the palace, heavy snowfall, warm gold light from every window, cold blue night sky, no people.
- **Motion prompt:** Slow push-in toward the glowing palace windows; snow drifts across the frame. Sound: howling winter wind, faint string music and laughter from inside.
- **Edit overlay (text added in the edit, top third, 0.0–3.0s):** They poured wine on the maid…

### Shot 2 — The maid in the hall (Kling, 4s, use 3.5s)

- **In frame:** exactly one person in focus; nobles blurred in the background.
- **Still prompt:** \[L2\]. Wide shot down the long banquet table; nobles in velvet and silk laughing and drinking, blurred and out of focus. In the sharp foreground, \[ELARA-MAID\] walks toward the camera with her head bowed, holding a silver wine jug in both hands.
- **Motion prompt:** She walks slowly forward with her head down; the camera tracks slowly backward in front of her; candle flames flicker; blurred courtiers in the background lean together, whispering and glancing at her. Sound: crowded chatter, laughter, clinking goblets, lute music.

### Shot 3 — “Kneel and pour” (Kling, 4s, use 4.0s)

- **In frame:** exactly two people.
- **Still prompt:** \[L2\]. Medium shot. \[SERAPHINE\] stands up from her chair at the banquet table holding a gold goblet, looking down with a cruel smile at \[ELARA-MAID\], who has stopped in front of her with her head bowed, holding the silver wine jug.
- **Motion prompt:** Seraphine tilts her head and smirks; Elara stays still. Seraphine says in a sweet but cruel British accent: “Kneel and pour, servant.” Sound: the hall chatter quietens.
- **Subtitle:** Kneel and pour, servant.

### Shot 4 — The wine (Kling, 4s, use 4.0s)

- **In frame:** exactly two people.
- **Still prompt:** \[L2\]. \[ELARA-MAID\] kneels on the polished stone floor, eyes closed, as \[SERAPHINE\] stands over her and tips a gold goblet, pouring red wine over Elara’s headscarf and face. Blurred nobles laughing behind them.
- **Motion prompt:** Red wine pours slowly over Elara’s head and drips down her face; she does not move. Seraphine laughs; blurred nobles behind them point and laugh behind their hands. Sound: wine splashing, the whole court bursting into laughter.

### Shot 4b — The gossip (Kling, 4s, use 3.0s)

- **In frame:** exactly two extras (unnamed noble ladies), no main characters.
- **Still prompt:** \[L2\]. Medium shot of two young noble ladies at the banquet table, one in dark red velvet and one in mustard-yellow silk, leaning close together, one whispering behind an open black lace fan while the other covers a smile; candlelight; more guests blurred behind them.
- **Motion prompt:** The lady with the fan whispers into the other’s ear; both glance sideways toward the off-screen maid and giggle. The lady in red whispers in a British accent: “Serves the little rat right.” Sound: murmuring crowd, rustling silk, a giggle.
- **Subtitle (italics):** Serves the little rat right.

### Shot 5 — “Not yet” (Kling, 4s, use 4.0s)

- **In frame:** exactly one person.
- **Still prompt:** \[L2\]. Close-up of \[ELARA-MAID\], kneeling, red wine dripping from her headscarf and chin, eyes lowered, calm. Her right hand rests flat on the stone floor; thin white frost spreads outward from her fingertips in fern-like patterns. Her eyes are normal and human.
- **Motion prompt:** The frost slowly creeps further across the floor from her fingers; a wine drop falls from her chin; she slowly opens her eyes and whispers in a soft British accent: “Not yet.” Sound: the laughter muffled and distant, a quiet crackling of ice.
- **Subtitle:** Not yet.

### Shot 6 — The frozen goblet (Kling, 4s, use 3.5s)

- **In frame:** exactly one person.
- **Still prompt:** \[L2\]. Medium close-up of \[SERAPHINE\] laughing as she raises her gold goblet in a toast; white frost is starting to form at the base of the goblet in her hand.
- **Motion prompt:** Frost races up the goblet and the wine inside freezes solid; ice crystals climb onto her fingers; her laugh turns into a gasp and she drops the goblet. Sound: sharp crackling ice, a gasp, the goblet clattering on stone, then sudden silence as the blurred guests behind her freeze and stare.

### Shot 7 — The prince stands (Kling, 4s, use 3.5s)

- **In frame:** exactly one person in focus.
- **Still prompt:** \[L2\]. At the raised high table under the navy-and-gold banners, \[CASSIAN\] rises slowly from his carved chair, staring down the hall with intense suspicion; candlelight on his face; blurred guests around him turning to look where he looks.
- **Motion prompt:** He finishes standing and stares; the camera slowly pushes in on his face. He says quietly in a deep British accent: “Who are you?” Sound: silence, a chair scraping on stone.
- **Subtitle:** Who are you?

### Shot 8 — The Queen Mother (Kling, 4s, use 3.5s + 0.5s black)

- **In frame:** exactly one person.
- **Still prompt:** \[L2\]. Close-up of \[ISOLDE\] seated at the high table, holding a gold goblet in her black-lace-gloved hand; her polite smile is fading; white frost is beginning to cover her goblet.
- **Motion prompt:** Frost spreads over her goblet; her smile vanishes and her eyes narrow as she stares down the hall. She whispers in a cold British accent: “Impossible… the Frost blood is dead.” Sound: a low ominous drone, ice crackling.
- **Subtitle:** Impossible… the Frost blood is dead.
- **Edit:** cut to black for the last 0.5s; end card (edit text): **Part 2** with a small snowflake.

### Timing

These trims replace the “use” values in the shot headings: Shot 1 3.0 + Shot 2 3.0 + Shot 3 3.5 + Shot 4 3.5 + Shot 4b 3.0 + Shot 5 3.5 + Shot 6 3.5 + Shot 7 3.0 + Shot 8 3.5 + 0.5 black = **30.0 seconds**.

### Approval notes for the stills

- Shots 2–5: Elara’s hair must not show under the headscarf.
- Shot 4: the wine must be red and the goblet gold (not a glass).
- Shots 5, 6, 8: frost is white and thin at still stage; the motion prompt grows it.
- Shot 7: Cassian’s jaw scar is on his LEFT side.

## Budget, release and posting plan

The full season costs about **$117** of the roughly $230 Orbio balance, but only Episodes 1–4 (about $30) are committed before the first results come in.

| Item | Count | Unit cost | Total |
| --- | --- | --- | --- |
| Setup: portraits and costume sheets | 20 images | $0.04 | $0.80 |
| Setup: location plates | 9 images | $0.04 | $0.36 |
| Per episode: stills | 8 | $0.04 | $0.32 |
| Per episode: establishing shot (Veo 3.1 Lite) | 1 | $0.20 | $0.20 |
| Per episode: character shots (Kling 3.0 Pro) | 7 | $0.84 | $5.88 |
| Per episode: one re-run allowance | 1 | $0.84 | $0.84 |
| **Per episode** |  |  | **about $7.25** |
| **Season (16 episodes + setup)** |  |  | **about $117** |

### Release plan

1. **Batch 1:** produce Episodes 1–4 (about $30). Post Episodes 1, 2 and 3 on the same day, then Episode 4 the next day.
2. **Checkpoint after 72 hours:** if Episode 1 is pulling viewers through to Episodes 2–3, produce Episodes 5–10. If not, change the hook and cover of Episode 1 and re-post before spending more.
3. **Then one episode a day** at the same time (evening in your main audience’s time zone). Never skip a day mid-series.

### TikTok posting

- **Title format:** The Frozen Maid Is the Ice Queen — Part 1. Put every episode in one TikTok playlist named after the series and pin Episode 1 on your profile.
- **Cover frame:** Shot 6 of each episode (the most dramatic frame), with “Part X” in large text.
- **Caption template:** They poured wine on the maid… then the wine froze ❄️ Follow for Part 2 — #aidrama #shortdrama #icequeen #fantasy #revenge #minidrama #royalty
- **Sound:** post the version without the music bed and add a trending dramatic or orchestral sound inside TikTok at low volume, so dialogue stays clear.
- **Comments:** reply to early comments with a teaser line from the next episode; it pushes viewers to follow.

### Hand-off instruction for the production session

> Produce Season 1 of “The Frozen Maid Is the Ice Queen” from this series bible. Step 1 (setup, cap $1.50): generate every portrait, costume sheet and location plate exactly as specified, run the mirror check, and send them to me as contact sheets for approval. Step 2 (after approval): produce Episode 1 from its shot list, cap $8, sending the stills as one numbered contact sheet for approval before animating. Follow the Production rules and QA checklist exactly. Export two versions (with and without a music bed), 1080×1920.

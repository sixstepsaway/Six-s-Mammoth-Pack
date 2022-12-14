# Bugs/Troubleshooting

#### Why?

When making this modpack I did a lot of work figuring different facets out and troubleshooting and bugbashing. A lot of time was spent searching the r/FeedTheBeast reddit, the ModdedMinecraft Discord and the KubeJS discord for any sign of information I needed to figure out the problems. 

Not only did I not want, in six months time, to run into the same problem again and have to repeat the process because I didn't document how I did it the first time, but also I thought it might be useful for other modpack devs. Who knows. Better for it to be available and unneeded, than unavailable and needed, right?

## Pre-Alpha

### TPS lag the second you log in

To begin with, I assumed something was just borked, so I took everything out and put it all back in slowly bit by bit, but I couldn't figure it out. It seemed like tiny mods that did nothing would cause massive TPS lag, but bigger mods would do nothing and cause no issues. 

Eventually I shoved everything I knew would at least *load in* in, and then I opened InControl's "spawn.json" and I set it up like this:

`[
  {
    "dimension": "minecraft:overworld",
"onjoin": true,
    "result": "deny"
  }
]`

Loading in, the TPS was a dream; 20TPS and stable.  It proved to me that it was mob-related, not just something causing lag in some other way. 

(This is, after all, how you troubleshoot: pair it down until you figure out the main problem)

I had thought maybe the problem was Genetic Animals, so I swapped it to only stop hostile mobs spawning: still 20FPS.

I started taking mobs in and out through In Control, telling it to not spawn Ice and Fire mobs, to not spawn Special Mobs, to not spawn AlexsMobs and so on.

Eventually, through so many Spark profilers I'm shocked they aren't demanding I pay for server space, I identified that "on Entity Tick" was being hooked into by multiple mods, but the main one was Improved Mobs. I wanted to keep Improved Mobs for the digger zombies, but disabling Improved Mobs immediately fixed the majority of the TPS lag. 

After some poking and prodding, I realized Improved Mobs has a common config in which you can list mobs *not* to hook into. I added everything except for the mobs I wanted hooked into (vanilla minecraft mobs) and the majority of the TPS lag poofed away like it was never anything at all. 

Check your hooks, folks. 

### Ease of Troubleshooting Mods

Originally I was using a folder system similar to what I use for the Sims, except everything had to be tossed in one big heap in the Mods folder. So, I'd have a folder called "Modpack Mods" (well, it was named my WIP title for the modpack, but) and I'd make a folder tree such as:

` - Mods
-- Libraries
-- Mobs
-- Origins
-- performance`

The issue was that it was really hard to find things in the main Mods folder of the pack itself, and it got overwhelming moving around so much. Eventually, when I wasn't even looking for it, I found the mod [Structured Mod Loader](https://www.curseforge.com/minecraft/mc-mods/structured-mod-loader-forge) which was an absolute *life-saver*. Now, my mods folder for the WIP of the modpack looks like that original folder tree. If I want to take all the mobs mods out for troubleshooting I can rename the folder "Mobs-ignore" and those files just don't load in. I can nest an "ignore" folder inside "performance" and test performance mods without losing track of what they are.

(Let's be honest, a lot of mods have baffling names.)

Currently my filetree looks like this: 

`- devtools
- dims
- hats [generated by iChun's hats mod, not my own making]
- ignore
- kubejs
- libraries
- mobs
- origins
- performance
- QoL
- worldgen
`

Everything in the root mods folder is anything that doesn't fit those categories.

Eventually I think I'll make a folder for clientside mods, to make setting up a server easier, but rn this is fine. 

The nice thing is that when I push an update, I can take out the dev tools if I want, or remove the mods in the "ignore" folder all-together. I don't have to rename them jar.disabled, I can just move things into folders.

Truly, a dream come true.

## Exporting for Git and Curse

I hit on a problem where Curseforge will not export my pack properly. I ended up trying Pax and Packwiz, but both required Curseforge exports to function - lol! In the end I found [CFE Exporter](https://github.com/Gaz492/CFExporter) - and it saved my bacon completely. 
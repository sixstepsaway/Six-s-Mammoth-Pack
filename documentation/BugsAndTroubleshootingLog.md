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

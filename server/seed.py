#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app, add_category
from models import db, Game, User, Review, Category

gamelist =[
{'title': 'Gun Spin', 'path':'https://www.twoplayergames.org/gameframe/gunspin', 'thumbnail':'https://images.twoplayergames.org/files/games/other/Gun_Spin.jpg', 'categories': ['skill','gun'], 'description': 'Shoot a gun three times and get to the end of the stage.', 'user_id': 11},

{'title':'Rock Paper Scissors', 'path':	'https://www.twoplayergames.org/gameframe/rock-paper-scissors',	'thumbnail': 'https://images.twoplayergames.org/files/games/mobile/o1/Rock_Paper_Scissors/Rock_Paper_Scissors.jpg','categories':['multiplayer','classic'], 'description': 'Rock paper scissors', 'user_id':	15},

{'title': 'Deck Adventurers - Chapter 3', 'path': 'https://19093.cache.armorgames.com/files/games/deck-adventurers-cha-19093/index.html?v=1613935164', 'thumbnail':	'https://gamemedia.armorgames.com/19093/icn_feat.png', 'categories':['pixel','strategy','html','fighting','card'], 'description':"Finally, Berem and Tasha arrive at Grimel's gates, but what awaits them there will not be easy. Fully customize your deck, and choose which heroes fight each fight!", 'user_id':19},

{ 'title': 'Captain Molly', 'path':	'https://19030.cache.armorgames.com/files/games/captain-molly-19030/index.html?v=1598711918', 'thumbnail':'https://gamemedia.armorgames.com/19030/icn_feat.png', 'categories': ['shooting', 'html','action','top-down'], 'description':	"Captain Molly is a game about heroism, honor and sacrifice. You play as Molly, a fearless commando, ready to any sacrifice to save innocent kittens. Led by Erwin, you'll have to defeat all the enemies in the Fox Base to complete the mission you have been sent here for.", 'user_id':17},

{ 'title': 'Adventure Boy: Jailbreak', 'path': 'https://19165.cache.armorgames.com/files/games/adventure-boy-jailbr-19165/index.html?v=1626608729', 'thumbnail': 'https://gamemedia.armorgames.com/19165/icn_feat.png', 'categories':['adventure','funny','html','keyboard-only'], 'description':"You're Benson, the broke but resourceful kid, on a mission to break your friend out of jail using nothing but the junk you can scrape up around town. A huge cast of funny, weird and thoughtful characters await you, with custom responses to nearly every permutation of items. Can you find the secret room?", 'user_id':9},

{ 'title': 'Astro-Steve Adventure', 'path':	'https://19362.cache.armorgames.com/files/games/astro-steve-adventur-19362/index.html?v=1683237386', 'thumbnail': 'https://gamemedia.armorgames.com/19362/icn_feat.png', 'categories':['platformer','html','space','adventure'],'description':"You urgently need to return to your space station, unfortunately you repeatedly crash on any planet in your way. Thankfully you can flip gravity on occasion so it shouldn't be too hard, right?", 'user_id':14},

{'title': 'Slide Box 2', 'path': 'https://19257.cache.armorgames.com/files/games/slide-box-2-19257/index.html?v=1653006785', 'thumbnail':'https://gamemedia.armorgames.com/19257/icn_feat.png', 'categories':['Block','puzzle','platformer','html'],  'description':	"Slide the blocks to the goal! The player can move and jump. Press the arrow buttons or arrow keys to slide blocks. Sliding blocks will take you to places you couldn't go before.", 'user_id':20},

{ 'title': 'Kingsfall', 'path':	'https://18910.cache.armorgames.com/files/games/kingsfall-18910/index.html?v=1585953030', 'thumbnail':'https://gamemedia.armorgames.com/18910/icn_feat.png', 'categories': ['clicker','fighting','rpg','idle'], 'description':'KINGSFALL - a clicker game with RPG elements. Control a mighty knight and help him in his brave journey to battle the DEMON and save the world.', 'user_id':12},

{'title': "Knight's Blade", 'path':	'https://19309.cache.armorgames.com/files/games/knights-blade-19309/index.html?v=1672152382', 'thumbnail': 'https://gamemedia.armorgames.com/19309/icn_feat.png', 'categories':['rpg','adventure','html','action'], 'description':"Knight's Blade is an Action RPG in a Medieval Fantasy Setting where you slay enemies, upgrade your equipment, and move to different areas to find stronger enemies and upgrades. All packed into a game with a unique combat system like no other.", 'user_id':13},

{'title': 'Blightborne', 'path': 'https://18797.cache.armorgames.com/files/games/blightborne-18797/index.html?v=1573071282', 'thumbnail': 'https://gamemedia.armorgames.com/18797/icn_feat.png', 'categories':['dungeon','adventure','pixel','rpg'], 'description':'Play as Rand the chosen one to defeat the evil lurking inside the dungeons and save his village. Find the long lost artifact which can bring life back to his village and their inhabitants.', 'user_id':15},

{'title': 'Arcade Wizard', 'path':	'https://18995.cache.armorgames.com/files/games/arcade-wizard-18995/index.html?v=1607528910','thumbnail':'https://gamemedia.armorgames.com/18995/icn_feat.png', 'categories':['wizard','action','html'], 'description': "Save Arcadia by getting back the Tome of Arcade Intellect from the evil wizard Alistair. In this action filled top down shooter you can unlock new orbs and skins by fighting waves of enemies.", 'user_id': 10},

{'title': 'Ninja Kite', 'path':'	https://19365.cache.armorgames.com/files/games/ninja-kite-19365/index.html?v=1686095875', 'thumbnail':	'https://gamemedia.armorgames.com/19365/icn_feat.png', 'categories': ['running','html','action','mouse-only'], 'description':	"A morning routine for a ninja named Kenzo. He must finished a 5K run to keep his body fit. But it's not a regular morning run, Kenzo must collect coins and avoid obstacles. With collected coins he found on the way, Kenzo is able to learn new jutsus (skills). And with friends he met along the way, Kenzo’s morning routine will be interesting to watch.", 'user_id':18},

{'title': "Bunny's Cavern", 'path':	'https://18989.cache.armorgames.com/files/games/bunnys-cavern-18989/index.html?v=1594725837', 'thumbnail': 'https://gamemedia.armorgames.com/18989/icn_feat.png', 'categories':['platformer','animal', 'bunny'], 'description':'A little bunny has fallen into a dangerous old cavern, help him find a way out!', 'user_id':18},

{'title': 'P.E. Noire', 'path':	'https://cache.armorgames.com/files/games/pe-noire-18467/index.html?v=1536693493', 'thumbnail':	'https://gamemedia.armorgames.com/18467/icn_feat.png', 'categories': ['point-&-click','cute','detective'], 'description':"	P.E. Noire is a point-and-click adventure game set in Sunnyside Elementary School. You're a Hall Monitor! Help your fellow students and get the riff-raff in line, because the halls of this school are crawling with shady characters.", 'user_id':13}
]

comments=[
            "An absolute masterpiece! Can't recommend it enough.",
            "Mind-blowing experience. Worth every penny.",
            "A hidden gem. Discovering this was pure joy.",
            "The soundtrack alone deserves a 10/10.",
            "Graphics are stunning, felt like I was in another world.",
            "Couldn't put it down. Sleep? Who needs that!",
            "A rollercoaster of emotions. Prepare for the feels.",
            "10/10 would play again and again.",
            "So addictive! I lost track of time.",
            "Incredible storytelling. I was hooked from the start.",
            "Gameplay mechanics are top-notch. Smooth as butter.",
            "The attention to detail is simply amazing.",
            "Laughed, cried, and everything in between.",
            "A must-play for any gaming enthusiast.",
            "Revolutionary. Sets a new standard in gaming.",
            "Couldn't stop smiling while playing. Pure joy.",
            "Immersive world. It felt real.",
            "Challenging, but in the best way possible.",
            "Characters are so well-developed. Like real people.",
            "A gaming experience like no other."
]


def upload_game(game):
    g = Game(
        title = game['title'],
        description = game['description'],
        thumbnail = game['thumbnail'],
        path = game['path'],
        user_id= game['user_id'],
    )
    db.session.add(g)
    for category in game['categories']:
            add_category(g, category)
    db.session.commit()



reviews = [
            Review(
        game_id=randint(2, 11),
        user_id=randint(2, 20),
        game_score=randint(0, 5),
        comment=comments[randint(0,19)]
                )
        for _ in range(20)
        ]




if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        for review in reviews:
            db.session.add(review)
            game = Game.query.filter(Game.id ==review.game_id).first()
            temp =[review.game_score for review in game.reviews]
            game.score = int(sum(temp)/len(temp))
            db.session.add(game)
        db.session.commit()















game_hash={
	"rock":0,
	"paper":2,
	"lizard":3,
	"spock":1,
	"scissors":4
}

def name_to_number(name):
	return game_hash.get(name)

def number_to_name(number):
	for i in game_hash.keys():
		if game_hash[i]==number:
			return i



def main():
	print("Start game")
	while True :
	    playerChoice = raw_input("Enter rock, spock, paper, lizard, scissors, or Q to quit: ")
	    if playerChoice == 'Q':
	        break
	    else:
	        game(playerChoice)

if __name__ == '__main__':
	main()

var app = angular.module('app', []);

app.controller('gameCtrl', function($scope) 
{ 

// creates the game board
$scope.gameBoard =
[
	{
		mark:'',
		moleStat:0
		
	},
	{
		mark:'',
		moleStat:0
	},
	{
		mark:'',
		moleStat: 0
	},
	{
		mark:'',
		moleStat: 0
	},
	{
		mark:'',
		moleStat: 0
	},
	{
		mark:'',
		moleStat: 0
	},
	{
		mark:'',
		moleStat: 0
	},
	{
		mark:'',
		moleStat: 0
	},
	{
		mark:'',
		moleStat: 0
	}
];
 
// declare number of players
$scope.players = 
[
	{
		name: '',
		moleNum: 1
	}, 
	{
		name: '', 
		moleNum: 1
	}
];


// set the players name
$scope.addName = function() 
{
      
        $scope.players[0].name = $scope.player1;
        $scope.players[1].name = $scope.player2;




};



	
// switch players turn if statement
$scope.currPlayer =1;
$scope.moleCount =1;

$scope.switchPlayer = function($index) 
{  

if ($scope.moleCount === 1) 
			{
				if ($scope.players[0].moleNum === 1)
				{
					$scope.gameBoard[$index].moleStat = 1;	
					$scope.players[0].moleNum = 0;
					
				}
			}
		if ($scope.moleCount === 2)
			{ 
				if ($scope.players[1].moleNum === 1)
				{
					$scope.gameBoard[$index].moleStat = 2;
					$scope.players[1].moleNum = 0;
					$scope.moleCount += 8;

				}			
			}
$scope.moleCount ++;
	


// good shit 
	if ($scope.currPlayer === 1 && $scope.moleCount > 11) 
	{
		if ($scope.gameBoard[$index].moleStat === 2) 
		{ 
			$scope.max = 'max.jpg'; 
			$scope.gameBoard[$index].moleStat = 0;
			$scope.currPlayer ++; 
			
		}
		else if ($scope.gameBoard[$index].mark === '' && $scope.gameBoard[$index].moleStat === 0) 
		{
			$scope.gameBoard[$index].mark ='x';
			$scope.currPlayer ++;
		}
	}
	else if ($scope.currPlayer === 2 && $scope.moleCount > 11)
	{
		if ($scope.gameBoard[$index].moleStat === 1) 
		{ 
			$scope.max = 'max2.jpg'; 
			
			$scope.gameBoard[$index].moleStat = 0;
			$scope.currPlayer--;	
		}
		else if ($scope.gameBoard[$index].mark === '' && $scope.gameBoard[$index].moleStat === 0) 
		{
			$scope.gameBoard[$index].mark ='o';
			$scope.currPlayer --;
		}
	};



	// The winning conditions and the outcome

		if (
			   $scope.gameBoard[0].mark === 'x' && $scope.gameBoard[1].mark === 'x' && $scope.gameBoard[2].mark === 'x' 
			|| $scope.gameBoard[3].mark === 'x' && $scope.gameBoard[4].mark === 'x' && $scope.gameBoard[5].mark === 'x' 
			|| $scope.gameBoard[6].mark === 'x' && $scope.gameBoard[7].mark  === 'x' && $scope.gameBoard[8].mark  === 'x' 
			
			|| $scope.gameBoard[0].mark  === 'x' && $scope.gameBoard[3].mark  === 'x' && $scope.gameBoard[6].mark  === 'x' 
			|| $scope.gameBoard[1].mark  === 'x' && $scope.gameBoard[4].mark  === 'x' && $scope.gameBoard[7].mark  === 'x' 
			|| $scope.gameBoard[2].mark  === 'x' && $scope.gameBoard[5].mark  === 'x' && $scope.gameBoard[8].mark  === 'x' 

			|| $scope.gameBoard[0].mark  === 'x' && $scope.gameBoard[4].mark  === 'x' && $scope.gameBoard[8].mark  === 'x'
			|| $scope.gameBoard[2].mark  === 'x' && $scope.gameBoard[4].mark  === 'x' && $scope.gameBoard[6].mark  === 'x' 



			
			) 
		{ 
			console.log("You're A Winner");
		} 
		else if (

   				$scope.gameBoard[0].mark === 'o' && $scope.gameBoard[1].mark === 'o' && $scope.gameBoard[2].mark === 'o' 
			|| $scope.gameBoard[3].mark === 'o' && $scope.gameBoard[4].mark  === 'o' && $scope.gameBoard[5].mark  === 'o' 
			|| $scope.gameBoard[6].mark === 'o' && $scope.gameBoard[7].mark  === 'o' && $scope.gameBoard[8].mark  === 'o' 


			|| $scope.gameBoard[0].mark  === 'o' && $scope.gameBoard[3].mark  === 'o' && $scope.gameBoard[6].mark  === 'o' 
			|| $scope.gameBoard[1].mark  === 'o' && $scope.gameBoard[4].mark  === 'o' && $scope.gameBoard[7].mark  === 'o' 
			|| $scope.gameBoard[2].mark  === 'o' && $scope.gameBoard[5].mark  === 'o' && $scope.gameBoard[8].mark  === 'o' 

			|| $scope.gameBoard[0].mark  === 'o' && $scope.gameBoard[4].mark  === 'o' && $scope.gameBoard[8].mark  === 'o' 
			|| $scope.gameBoard[2].mark  === 'o' && $scope.gameBoard[4].mark  === 'o' && $scope.gameBoard[6].mark  === 'o' 


			)
		{ 
			console.log("You're A Winner");
		}
		else
		{
			console.log("Draw Bitches");
		}

}; // end of switchPlayer function




});// the end of angular.module app

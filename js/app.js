var app = angular.module('app', ['firebase']);

app.controller('gameCtrl', ["$scope", "$firebase",
    function($scope, $firebase) {


        // creates the game board with the initial values
        var initialBoard = {
            cells: [{
                mark: '',
                moleStat: 0
            }, {
                mark: '',
                moleStat: 0
            }, {
                mark: '',
                moleStat: 0
            }, {
                mark: '',
                moleStat: 0
            }, {
                mark: '',
                moleStat: 0
            }, {
                mark: '',
                moleStat: 0
            }, {
                mark: '',
                moleStat: 0
            }, {  
                mark: '',
                moleStat: 0
            }, {
                mark: '',
                moleStat: 0
            }],
            currPlayer: 0,
            playerNum: 0,
            gameInProgress: true, 
            results: "",
            players: [{
                name: '',
                moleNum: 1
            }, {
                name: '',
                moleNum: 2
            }]
        };


        // declare number of players


        var ref = $firebase(new Firebase('https://tictacmoles.firebaseio.com/data'));
        var syncObject = ref.$asObject();

        syncObject.$bindTo($scope, "gameBoard").then(function() {
            if (!$scope.gameBoard.gameInProgress) {
                $scope.gameBoard = initialBoard;
            }

            $scope.playerNumber = $scope.gameBoard.playerNum;
            $scope.gameBoard.playerNum += 1;

        });

        
        // set and add the players name to the array
        $scope.addName = function() {
            if ($scope.playerNumber == 0) {
                $scope.gameBoard.players[0].name = $scope.playerName;
                console.log('Waiting for player');
            } else if ($scope.playerNumber == 1) {
                $scope.gameBoard.players[1].name = $scope.playerName;
            } else if ($scope.playerNumber > 1) {
                alert('Please wait for your turn');
            }
        };

        $scope.switchPlayer = function($index) {


            if ($scope.gameBoard.currPlayer == $scope.playerNumber && $scope.gameBoard.cells[$index].mark == '') {
                $scope.moleTrap($index); // Mole function called to plant the mole trap
                $scope.initGame($index); // Init function called to place game pieces on the game board
                $scope.winCond(); // Winning condition function called to check results
 
                $scope.gameBoard.currPlayer = ($scope.gameBoard.currPlayer + 1) % 2; //Switch from player one to two
                
            } else if ($scope.gameBoard.cells[$index].mark != ''){
                    alert("Monty doesn't like that.");
            } else {
                alert('Please wait your turn.');
            }
        }

        // Function to place the mole trap
        $scope.moleTrap = function($index) {
            if ($scope.gameBoard.currPlayer == 0 && $scope.gameBoard.players[0].moleNum == 1) {
                $scope.gameBoard.cells[$index].moleStat = 1;
                $scope.gameBoard.players[0].moleNum = 0;

            } else if ($scope.gameBoard.currPlayer == 1 && $scope.gameBoard.players[1].moleNum == 2) {
                $scope.gameBoard.cells[$index].moleStat = 2;
                $scope.gameBoard.players[1].moleNum = 0;

            }


        }

        // Initiate game play and logic
        $scope.initGame = function($index) {
            if ($scope.gameBoard.currPlayer === 0) {
                if ($scope.gameBoard.cells[$index].moleStat === 2) {

                    $scope.max = '../images/moled2animation.gif';
                    console.log('You Got Moled!');
                    $scope.gameBoard.cells[$index].moleStat = 0;
                    $scope.playerMole2 = true;


                } else if ($scope.gameBoard.cells[$index].mark === '' && $scope.gameBoard.cells[$index].moleStat === 0) {
                    $scope.gameBoard.cells[$index].mark = 'x';



                }
            } else if ($scope.gameBoard.currPlayer === 1) {
               
                if ($scope.gameBoard.cells[$index].moleStat === 1) {
                    $scope.max = '../images/moled1animation.gif';
                    $scope.gameBoard.cells[$index].moleStat = 0;
                    $scope.playerMole = true;


                } else if ($scope.gameBoard.cells[$index].mark === '' && $scope.gameBoard.cells[$index].moleStat === 0) {
                    $scope.gameBoard.cells[$index].mark = 'o';
                   
                }

            };


        }; // end of switchPlayer function
  
        $scope.winner = function() {
            if ($scope.gameBoard.currPlayer == 0) {
                $scope.gameBoard.results = $scope.gameBoard.players[0].name + " is the winner!!"
            } else {
                $scope.gameBoard.results = $scope.gameBoard.players[1].name + " is the winner!!"
            }
        }
        $scope.draw = function($index) {
            if ($scope.gameBoard.cells[$index] != ''){
                $scope.gameBoard.results = "Sorry mole wranglers it's a draw";
            }

        }

        // The winning conditions and the outcome
        $scope.winCond = function() {
            if (
                $scope.gameBoard.cells[0].mark === 'x' && $scope.gameBoard.cells[1].mark === 'x' && $scope.gameBoard.cells[2].mark === 'x' || $scope.gameBoard.cells[3].mark === 'x' && $scope.gameBoard.cells[4].mark === 'x' && $scope.gameBoard.cells[5].mark === 'x' || $scope.gameBoard.cells[6].mark === 'x' && $scope.gameBoard.cells[7].mark === 'x' && $scope.gameBoard.cells[8].mark === 'x'

                || $scope.gameBoard.cells[0].mark === 'x' && $scope.gameBoard.cells[3].mark === 'x' && $scope.gameBoard.cells[6].mark === 'x' || $scope.gameBoard.cells[1].mark === 'x' && $scope.gameBoard.cells[4].mark === 'x' && $scope.gameBoard.cells[7].mark === 'x' || $scope.gameBoard.cells[2].mark === 'x' && $scope.gameBoard.cells[5].mark === 'x' && $scope.gameBoard.cells[8].mark === 'x'

                || $scope.gameBoard.cells[0].mark === 'x' && $scope.gameBoard.cells[4].mark === 'x' && $scope.gameBoard.cells[8].mark === 'x' || $scope.gameBoard.cells[2].mark === 'x' && $scope.gameBoard.cells[4].mark === 'x' && $scope.gameBoard.cells[6].mark === 'x'
            ) {
                $scope.winner(); // calling winner function
            } else if (

                $scope.gameBoard.cells[0].mark === 'o' && $scope.gameBoard.cells[1].mark === 'o' && $scope.gameBoard.cells[2].mark === 'o' || $scope.gameBoard.cells[3].mark === 'o' && $scope.gameBoard.cells[4].mark === 'o' && $scope.gameBoard.cells[5].mark === 'o' || $scope.gameBoard.cells[6].mark === 'o' && $scope.gameBoard.cells[7].mark === 'o' && $scope.gameBoard.cells[8].mark === 'o'


                || $scope.gameBoard.cells[0].mark === 'o' && $scope.gameBoard.cells[3].mark === 'o' && $scope.gameBoard.cells[6].mark === 'o' || $scope.gameBoard.cells[1].mark === 'o' && $scope.gameBoard.cells[4].mark === 'o' && $scope.gameBoard.cells[7].mark === 'o' || $scope.gameBoard.cells[2].mark === 'o' && $scope.gameBoard.cells[5].mark === 'o' && $scope.gameBoard.cells[8].mark === 'o'

                || $scope.gameBoard.cells[0].mark === 'o' && $scope.gameBoard.cells[4].mark === 'o' && $scope.gameBoard.cells[8].mark === 'o' || $scope.gameBoard.cells[2].mark === 'o' && $scope.gameBoard.cells[4].mark === 'o' && $scope.gameBoard.cells[6].mark === 'o'


            ) {
                $scope.winner(); // calling winner function
               
            } else {
                $scope.draw();
            }
        }; // end of winning conditions



    } // end of gameCtrl controller
]); // the end of angular.module app

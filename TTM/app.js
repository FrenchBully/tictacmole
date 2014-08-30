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

        console.log($scope.playerNumber);
        // set and add the players name to the array
        $scope.addName = function() {
            if ($scope.playerNumber == 0) {
                $scope.gameBoard.players[0].name = $scope.playerName;
                console.log('Waiting for player');
            } else if ($scope.playerNumber == 1) {
                $scope.gameBoard.players[1].name = $scope.playerName;
                console.log($scope.gameBoard.players[1].name);

            }
        };

        $scope.switchPlayer = function($index) {


            if ($scope.gameBoard.currPlayer == $scope.playerNumber) {
                $scope.moleTrap($index); // Mole function called to plant the mole trap
                $scope.initGame($index); // Init function called to place game pieces on the game board
                $scope.gameBoard.currPlayer = ($scope.gameBoard.currPlayer + 1) % 2; //Switch from player one to two

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
            if ($scope.gameBoard.currPlayer === 0 && $scope.gameBoard.players[0].moleNum == 0) {
                if ($scope.gameBoard.cells[$index].moleStat === 2) {

                    $scope.max = 'max.jpg';
                    console.log('You Got Moled!');
                    $scope.gameBoard.cells[$index].moleStat = 0;

                } else if ($scope.gameBoard.currPlayer == 0 && $scope.gameBoard.cells[$index].mark === '' && $scope.gameBoard.cells[$index].moleStat === 0) {
                    $scope.gameBoard.cells[$index].mark = 'x';



                }
            } else if ($scope.gameBoard.currPlayer === 1 && $scope.gameBoard.players[1].moleNum == 0) {
                console.log($scope.gameBoard.currPlayer);
                if ($scope.gameBoard.cells[$index].moleStat === 1) {
                    $scope.max = 'max2.jpg';
                    $scope.gameBoard.cells[$index].moleStat = 0;
                   


                } else if ($scope.gameBoard.currPlayer == 1 && $scope.gameBoard.cells[$index].mark === '' && $scope.gameBoard.cells[$index].moleStat === 0) {
                    $scope.gameBoard.cells[$index].mark = 'o';
                   
                }

            };

            // $scope.winCond(); 	 // Check winning conditions of players

        }; // end of switchPlayer function


        // The winning conditions and the outcome
        $scope.winCond = function() {
            if (
                $scope.gameBoard.cells[0].mark === 'x' && $scope.gameBoard.cells[1].mark === 'x' && $scope.gameBoard.cells[2].mark === 'x' || $scope.gameBoard.cells[3].mark === 'x' && $scope.gameBoard.cells[4].mark === 'x' && $scope.gameBoard.cells[5].mark === 'x' || $scope.gameBoard.cells[6].mark === 'x' && $scope.gameBoard.cells[7].mark === 'x' && $scope.gameBoard.cells[8].mark === 'x'

                || $scope.gameBoard.cells[0].mark === 'x' && $scope.gameBoard.cells[3].mark === 'x' && $scope.gameBoard.cells[6].mark === 'x' || $scope.gameBoard.cells[1].mark === 'x' && $scope.gameBoard.cells[4].mark === 'x' && $scope.gameBoard.cells[7].mark === 'x' || $scope.gameBoard.cells[2].mark === 'x' && $scope.gameBoard.cells[5].mark === 'x' && $scope.gameBoard.cells[8].mark === 'x'

                || $scope.gameBoard.cells[0].mark === 'x' && $scope.gameBoard.cells[4].mark === 'x' && $scope.gameBoard.cells[8].mark === 'x' || $scope.gameBoard.cells[2].mark === 'x' && $scope.gameBoard.cells[4].mark === 'x' && $scope.gameBoard.cells[6].mark === 'x'
            ) {
                console.log("You're A Winner");
            } else if (

                $scope.gameBoard.cells[0].mark === 'o' && $scope.gameBoard.cells[1].mark === 'o' && $scope.gameBoard.cells[2].mark === 'o' || $scope.gameBoard.cells[3].mark === 'o' && $scope.gameBoard.cells[4].mark === 'o' && $scope.gameBoard.cells[5].mark === 'o' || $scope.gameBoard.cells[6].mark === 'o' && $scope.gameBoard.cells[7].mark === 'o' && $scope.gameBoard.cells[8].mark === 'o'


                || $scope.gameBoard.cells[0].mark === 'o' && $scope.gameBoard.cells[3].mark === 'o' && $scope.gameBoard.cells[6].mark === 'o' || $scope.gameBoard.cells[1].mark === 'o' && $scope.gameBoard.cells[4].mark === 'o' && $scope.gameBoard.cells[7].mark === 'o' || $scope.gameBoard.cells[2].mark === 'o' && $scope.gameBoard.cells[5].mark === 'o' && $scope.gameBoard.cells[8].mark === 'o'

                || $scope.gameBoard.cells[0].mark === 'o' && $scope.gameBoard.cells[4].mark === 'o' && $scope.gameBoard.cells[8].mark === 'o' || $scope.gameBoard.cells[2].mark === 'o' && $scope.gameBoard.cells[4].mark === 'o' && $scope.gameBoard.cells[6].mark === 'o'


            ) {
                console.log("You're A Winner");
            } else {
                console.log("Draw");
            }
        }; // end of winning conditions


    }
]); // the end of angular.module app

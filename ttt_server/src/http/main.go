package main

import (
	"fmt"
	// "io/ioutil"
	"log"
	"net/http"
	// "strconv"
    "http/helpers"
    // "reflect"
)

var cell [9]int
var varGame int
var winGame int
var fGameOver bool
var timestamp int64
var deltaTime int64

var BinTemplates map[string]string


func setHeaders(w http.ResponseWriter, lengthData int) http.ResponseWriter {
    w.Header().Set("Content-Type", "text/html")
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Access-Control-Allow-Credentials", "true")
    w.Header().Set("Access-Control-Allow-Headers", "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range")
    w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.WriteHeader(http.StatusOK)
    w.Header().Set("Content-Length", fmt.Sprint(lengthData))
    return w
}

func rootHandler(w http.ResponseWriter, r *http.Request) {
    if fGameOver {
        t:=helpers.Timestamp()
        fmt.Println(t,  timestamp + deltaTime)
        if t > timestamp + deltaTime {
            initGame()
        }
    }
    data := helpers.ShowMap(&cell, &varGame, &winGame, BinTemplates)
    w = setHeaders(w, len(data))
	fmt.Fprint(w, string(data))
}

func rootHandlerAdd(w http.ResponseWriter, r *http.Request) {
    if !fGameOver {
        c := r.FormValue("cell") 
        err := helpers.Add(c, &cell, &varGame)
        winGame, fGameOver, timestamp = helpers.CheckWin(&cell)
        fmt.Println(winGame, fGameOver, timestamp)
        if !err {
            helpers.SwapGame(&varGame)
        }
    }
    data := helpers.ShowMap(&cell, &varGame, &winGame, BinTemplates)
    w = setHeaders(w, len(data))
	fmt.Fprint(w, string(data))
}


func rootHandlerFav(w http.ResponseWriter, r *http.Request) {
	data := "favicon"
	w = setHeaders(w, len(data))
    fmt.Fprint(w, string(data))
}

func initGame(){
    cell = helpers.InitMap()
    varGame = -1
    winGame = 0
    fGameOver = false
}

func main() {
    deltaTime = 30
    BinTemplates = make(map[string]string)
    hex := [16]string{"0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"}
    for i:=0; i<=15; i++{
        BinTemplates[fmt.Sprintf("%04b", i)] = hex[i]
    }
    initGame()
    http.HandleFunc("/", rootHandler)
    http.HandleFunc("/add", rootHandlerAdd)
	http.HandleFunc("/favicon.ico", rootHandlerFav)
	log.Fatal(http.ListenAndServe(":8081", nil))
}
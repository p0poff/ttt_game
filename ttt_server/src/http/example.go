package main

import (
	"fmt"
	// "io/ioutil"
	"log"
	"net/http"
	// "strconv"
)

var num = 100

func getData(data string) string {
	num = num - 1
	return data + fmt.Sprintf(" %d", num)
	// return fmt.Sprint(*n)
}

func rootHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	w.WriteHeader(http.StatusOK)
	data := getData("okk")
	w.Header().Set("Content-Length", fmt.Sprint(len(data)))
	fmt.Fprint(w, string(data))
}

func rootHandlerFav(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	w.WriteHeader(http.StatusOK)
	data := "favicon"
	w.Header().Set("Content-Length", fmt.Sprint(len(data)))
	fmt.Fprint(w, string(data))
}

func main() {
	http.HandleFunc("/", rootHandler)
	http.HandleFunc("/favicon.ico", rootHandlerFav)
	log.Fatal(http.ListenAndServe(":8081", nil))
}
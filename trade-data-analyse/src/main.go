package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

func init() {
	fmt.Println("init====>")
	// 协程test
	fmt.Println("开启协程：")
	go say("world")
	say("hello")
}

func say(s string) {
	fmt.Println("执行")
	for i := 0; i < 5; i++ {
		time.Sleep(10)
		fmt.Println(s)
	}
}

func main() {
	router := gin.Default()
	router.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "hello world")
	})
	router.Run(":1688")
	fmt.Println("hello world")
}

package helpers

import (
    "strconv"
    "fmt"
    "time"
    // "reflect"
)


func InitMap() [9]int{
    var ar [9]int
    for i := 0; i < 9; i++ {
        ar[i] = 0
    }
    return ar
}

func Timestamp() int64 {
    return time.Now().Unix()
}

func ShowMap(ar *[9]int, v *int, win *int, b map[string]string) (string) {
    var s string
    for i := 0; i < 9; i++ {
        if ar[i]==-1 {
            s = "10" + s
        } else if ar[i]==1 {
            s = "11" + s
        } else {
            s = "00" + s
        }
    }

    if *win == 0 {
      s = "0" + s // game continue
    } else {
      s = "1" + s // game over
    }

    if *win == -1 || *win == 1 {
      s = "1" + s //win
    } else {
      s = "0" + s //drawn
    }
    //===============================
    if *v == -1 {
        s = "0" + s
    } else {
        s = "1" + s
    }

    // return s[0:4]
    fmt.Println(s)
    return bin2hex(s,b)
}

func bin2hex(s string, b map[string]string) string {
    // return b["000" + s[18:19]] + b[s[16:18]] + b[s[12:16]] + b[s[8:12]] + b[s[4:8]] + b[s[0:4]]
    return b["000" + s[0:1]] + b[s[1:5]] + b[s[5:9]] + b[s[9:13]] + b[s[13:17]] + b[s[17:21]]
}

func CheckWin(ar *[9]int) (int, bool, int64) {
    t := Timestamp()
    var sum [8]int
    sum[0] = ar[0] + ar[1] + ar[2]
    sum[1] = ar[3] + ar[4] + ar[5]
    sum[2] = ar[6] + ar[7] + ar[8]
    sum[3] = ar[0] + ar[3] + ar[6]
    sum[4] = ar[1] + ar[4] + ar[7]
    sum[5] = ar[2] + ar[5] + ar[8]
    sum[6] = ar[0] + ar[4] + ar[8]
    sum[7] = ar[2] + ar[4] + ar[6]
    for i := 0; i < 8; i++ {
        if sum[i] == -3 {
            return -1, true, t // win O
        }
        if sum[i] == 3 {
            return 1, true, t // win X
        }
    }
    fZero := false
    for i := 0; i < 9; i++{
        if ar[i] == 0 {
            fZero = true
        }
    }
    if !fZero {
        return 2, true, t // ничья
    }
    return 0, false, t
}

func Add(c string, ar *[9]int, v *int) bool {
    err := false
    i, _ := strconv.ParseInt(c, 10, 0)
    if i < 0 || i > 8 {
        err = true
        return err
    }
    if ar[i] == 0 {
        ar[i] = *v
    } else {
        err = true
        return err
    }
    return err
}

func SwapGame(v *int) {
    if *v == -1 {
        *v = 1
    } else {
        *v = -1
    }
}

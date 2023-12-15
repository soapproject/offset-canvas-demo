# A demo project to show how to solve text render difference between different device cross server and client.  
這個專案展示了如何解決在不同設備上伺服端跟客戶端文字渲染的差異。雖然這不是一個完美的解決方案，因為它無法處理字母間距或文字傾斜等問題，但它提供了一個基本的想法。  
This is not a perfect solution, because it can't solve Letter-spacing or skew...

## Idea  
核心思路是在客戶端和伺服器端都渲染一個英文字母“A”，然後比較這個“A”的最高點來找出偏移量。  
The basic idea is to render a English letter "A" at both client and server, then find the top point of "A" to compare the offset.

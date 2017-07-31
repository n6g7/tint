module.exports = `
<h1>Tint</h1>
<h2>Usage</h2>

<strong>Request</strong>
<pre><code>POST /tint HTTP/1.1
Content-Type: application/json
Host: tint.gnab.fr

{
  "url": "https://cdn-images-1.medium.com/max/2000/1*_bO_wis0q5DHOITEqfy6VA.jpeg"
}
</code></pre>

<strong>Response</strong>
<pre><code>HTTP/1.1 200 OK
Content-Length: 276
Content-Type: application/json

{
  "colours": [
    {
      "counts": 686955,
      "hex": "1C181D",
      "percent": "82.61%",
      "percentage": 0.8261,
      "rgb": "28,24,29"
    },
    {
      "counts": 111379,
      "hex": "B47D7F",
      "percent": "13.39%",
      "percentage": 0.1339,
      "rgb": "180,125,127"
    },
    {
      "counts": 33266,
      "hex": "523532",
      "percent": "4%",
      "percentage": 0.04,
      "rgb": "82,53,50"
    }
]
}</code></pre>`

using Api9Gag.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;
using PuppeteerSharp;

namespace Api9Gag.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class V1 : ControllerBase
    {
        [HttpGet(Name = "GetPosts")]
        public async Task<List<Post>> GetPosts(int pagesCount)
        {
            var options = new LaunchOptions
            {
                Headless = false,
                ExecutablePath = "C:\\Users\\wmate\\Downloads\\chrome-win\\chrome-win\\chrome.exe",
                //ExecutablePath = "/usr/bin/chromium",
                Args = new[] { "--no-sandbox", "--disable-setuid-sandbox" }
            };
            var posts = new List<Post>();
            using (var browser = await Puppeteer.LaunchAsync(options))
            {
                int iterationsCount = 0;
                var url = "https://9gag.com/";
                var page = await browser.NewPageAsync();
                await page.GoToAsync(url);//todo get info
                var infoJson = await page.GetContentAsync();
                //var info = infoJson.Split("src=\"").Select(x => x.Substring(0, x.IndexOf("\""))).ToList();
                await page.ScreenshotAsync("C:\\Users\\wmate\\Downloads\\chrome-win\\screenshots\\test2.png");
                System.IO.File.WriteAllText("C:\\Users\\wmate\\Downloads\\chrome-win\\screenshots\\test2.html", infoJson);
            }
            return posts;
        }
    }
}

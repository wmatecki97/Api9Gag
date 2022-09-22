using Api9Gag.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PuppeteerSharp;

namespace Api9Gag.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class V1 : ControllerBase
    {
        [HttpGet(Name = "GetPosts")]
        public async Task<List<Post>> GetPosts(string category, int count)
        {
            var options = new LaunchOptions
            {
                Headless = true,
                ExecutablePath = "/usr/bin/chromium",
                Args = new[] { "--no-sandbox", "--disable-setuid-sandbox" }
            };
            var posts = new List<Post>();
            using (var browser = await Puppeteer.LaunchAsync(options))
            {
                int iterationsCount = 0;
                var url = "https://www.9gag.com";
                while (posts.Count < count && iterationsCount < 100)
                {
                    var page = await browser.NewPageAsync();
                    await page.GoToAsync(url);//todo get info
                    var infoJson = await page.GetContentAsync();
                    var info = JsonConvert.DeserializeObject<PostsInfo>(infoJson);
                    posts.AddRange(info.Posts);
                    url = url + "";//todo
                }

                //page.Keyboard.PressAsync("end");
                //await page.ScreenshotAsync("C:\\Users\\wmate\\Downloads\\chrome-win\\screenshots\\test2.png");

            }
            return posts;
        }
    }
}

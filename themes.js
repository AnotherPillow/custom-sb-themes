/*
  * Custom Skyblock Themes
*/

var themeParent = null;
const token = document.getElementsByName("_xfToken")[1].value
let ls = localStorage

const themeCSSElement = document.createElement("style")
themeCSSElement.id = "customTheme"

try {
    if (document.body.innerHTML.includes('<a href="#">Created by Benj</a>')) {
        if (ls.getItem("customThemeMode") === "true") {
            console.log("Theme for old skyblock but on new skyblock")
            ls.removeItem("customTheme")
            ls.removeItem("customThemeMode")
        }
        let footer = document.querySelector("#footer>.bottom>.container")
        if (footer) {
            footer.innerHTML+=`<br><div style="background-color: #00000011; border: 1px solid #00000011; padding: 5px; border-radius: 5px;">
            <dl class="choosers"><dt style="display:none; color:#9393ff">Style</dt><dd><a href="misc/style?redirect=%2F" class="OverlayTrigger Tooltip" rel="nofollow">Skyblock Original</a></dd></dl>
            <dl class="choosers"><dt style="display:none;">Style</dt><dd style="display: inline-flex;">
            <a href="http://pillow.rocks/customsbthemes/">Make theme here and paste output:</a><input type="text" id="footerInputEl" placeholder="Custom Theme JSON" style="height: 15px; margin-top: 2px;"><input type="submit" id="footerSubmitEl" value="Submit" style="height: 15px; margin-top: 2px; width: 50px;"></dd></dl>
            </div>`
            document.querySelector("#footerSubmitEl").addEventListener("click", function() {
                console.log("Clicked")
                addNewTheme(document.querySelector("#footerInputEl"))
            })
        }
    } else if (ls.getItem("customThemeMode") === "false" && document.location.href === "https://skyblock.net/") {
        console.log("Theme for new skyblock but on old skyblock")
        ls.removeItem("customTheme")
        ls.removeItem("customThemeMode")
    }
} catch (e) {
    alert(`An unknown error occurred: ${e}`)
}

if (ls.getItem("customTheme")) {
    if (ls.getItem("customThemeMode") === "true" && document.location.href === "https://skyblock.net/") {
        themeCSSElement.innerHTML = ls.getItem("customTheme")
    } else {
        themeCSSElement.innerHTML = ls.getItem("customTheme")
    }
}
themeCSSElement.innerHTML += `footer>.footer>.pageWidth>.pageContent>.choosers:first-child::after{content:"|"; font-size:14px}`
document.head.appendChild(themeCSSElement)

let addedThemes = false

if (!document.body.innerHTML.includes('<a href="#">Created by Benj</a>')) {
    const footerElements = document.querySelectorAll("footer>.footer>.pageWidth>.pageContent>*")

    const newFooter = document.createElement("dl")
    newFooter.classList.add("choosers")

    const newFooterTitle = document.createElement("dt")
    newFooterTitle.innerText = "Style" //Will be hidden by page

    const newFooterContent = document.createElement("dd")
    newFooterContent.style = "display: inline-flex;"

    newFooterContent.innerHTML = `<a href="http://pillow.rocks/customsbthemes/">Make theme here and paste output:</a>`

    newFooter.appendChild(newFooterTitle)

    const footerInput = document.createElement("input")
    footerInput.setAttribute("type", "text")
    footerInput.setAttribute("placeholder", "Custom Theme JSON")
    footerInput.style = 'height: 15px; margin-top:2px'

    const footerInputSubmit = document.createElement("input")
    footerInputSubmit.setAttribute("type", "submit")
    footerInputSubmit.setAttribute("value", "Submit")
    footerInputSubmit.style = 'height: 15px; margin-top:2px; width: 50px'

    footerInputSubmit.addEventListener("click", function() {
        addNewTheme(folderInput)
    })
    newFooterContent.appendChild(footerInput)
    newFooterContent.appendChild(footerInputSubmit)
    
    newFooter.appendChild(newFooterContent)
    
    
    footerElements[footerElements.length - 1].insertAdjacentElement("beforebegin", newFooter)
}






let themeBtn = document.querySelector(".OverlayTrigger.Tooltip")

themeBtn.addEventListener("click", function() {
    addCustomThemesToEl()
})

if (window.location.href === "https://skyblock.net/misc/style?redirect=%2F") {
    console.log("Theme page")
    addCustomThemesToEl()
}
    
function addNewTheme(el) {
    let input = el.value
    if (input) {
        try {
            console.log(input)
            let parsed = JSON.parse(input)
            let themes = JSON.parse(ls.getItem("customThemes") || "[]")

            if (!themes || typeof themes == "string")  
                themes = []

            themes.push(parsed)
                
            ls.removeItem("customThemes")
            ls.setItem("customThemes", JSON.stringify(themes))
            location.reload()
        } catch (e) {
            alert("Invalid JSON" + e)
        }
    }
}
    
function addCustomThemesToEl() {
    if (!addedThemes) {
        let themeExistsPromise = new Promise((resolve, reject) => {
            let interval = setInterval(() => {
                themeParent = document.querySelector(".chooserColumns.twoColumns")
                if (themeParent) {
                    clearInterval(interval)
                    resolve()
                }
            }, 100)
        })
        themeExistsPromise.then(() => {
            for (const theme of JSON.parse(ls.getItem('customThemes'))) {
                themeParent.appendChild(generateThemeElement(theme.name, theme.description, theme.basedOnOld, theme.css))
            }
            const defaultBtn = document.querySelector('div.section.styleChooser a[href^="misc/style?style_id=0"')
            defaultBtn.onclick = function() {
                ls.removeItem("customTheme")
                ls.removeItem("customThemeMode")
            }
            let themes = document.querySelectorAll(".chooserColumns.twoColumns li")
            let firstTheme = themes[0]
            let secondTheme = themes[1]
            firstTheme.onclick = function() {
                ls.removeItem("customTheme")
                ls.removeItem("customThemeMode")
            }
            secondTheme.onclick = function() {
                ls.removeItem("customTheme")
                ls.removeItem("customThemeMode")
            }
        })
        
        addedThemes = true
    }
}

function generateThemeElement(name, description, basedOnOld=true, css) {
    const li = document.createElement("li")
    li.setAttribute("class", "")
    const a = document.createElement("a")
    a.onclick = function(e) {
        ls.customTheme = css
        ls.customThemeMode = basedOnOld.toString()


    }
    if (basedOnOld)
        a.href = 'misc/style?style_id=6&_xfToken=' + token + '&redirect=https://skyblock.net/'
    else
        a.href = 'misc/style?style_id=22&_xfToken=' + token + '&redirect=https://skyblock.net/'
    
    const span1 = document.createElement("span")
    span1.classList.add("icon")
    span1.classList.add(`style${basedOnOld ? "6" : "22"}`)
    span1.innerHTML= '<span></span>'
    
    const span2 = document.createElement("span")
    span2.classList.add("title")
    span2.innerText = name
    
    const span3 = document.createElement("span")
    span3.classList.add("description")
    span3.innerText = description
    
    a.appendChild(span1)
    a.appendChild(span2)
    a.appendChild(span3)
    
    li.appendChild(a)

    return li
}
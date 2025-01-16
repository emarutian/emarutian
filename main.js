// Why: Simulate terminal typing with cursor
const typeText = (element, text, speed = 50) => {
    let index = 0
    element.textContent = ''
    
    return new Promise(resolve => {
        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index)
                index++
                setTimeout(type, speed)
            } else {
                resolve()
            }
        }
        type()
    })
}

// Why: Create artificial delay between commands
const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

// Why: Initialize terminal behavior
document.addEventListener('DOMContentLoaded', async () => {
    const commands = document.querySelectorAll('.typing')
    const cursor = document.querySelector('.cursor')
    
    // Why: Type each command sequentially
    for (const cmd of commands) {
        const text = cmd.textContent
        await wait(500)
        await typeText(cmd, text, 100)
        await wait(300)
    }
    
    // Why: Add hover effect to project items
    const projectItems = document.querySelectorAll('.project-item')
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.borderColor = '#33ff00'
            item.style.background = 'rgba(0, 255, 0, 0.05)'
        })
        
        item.addEventListener('mouseleave', () => {
            item.style.borderColor = '#00cc00'
            item.style.background = 'rgba(0, 255, 0, 0.03)'
        })
    })
    
    // Why: Add keyboard navigation
    let currentFocus = -1
    
    document.addEventListener('keydown', e => {
        if (e.key === 'Tab') {
            e.preventDefault()
            projectItems.forEach(item => item.style.borderColor = '#00cc00')
            
            currentFocus = (currentFocus + 1) % projectItems.length
            projectItems[currentFocus].style.borderColor = '#33ff00'
            projectItems[currentFocus].scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        }
    })
    
    // Why: Add CRT flicker effect
    const addFlicker = () => {
        const scanline = document.querySelector('.scanline')
        if (Math.random() < 0.0015) {
            scanline.style.opacity = Math.random()
            setTimeout(() => {
                scanline.style.opacity = 1
            }, 50)
        }
    }
    
    setInterval(addFlicker, 30)
})

// Why: Smooth scroll behavior for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        
        // Why: Add terminal-like effect when navigating
        const prompt = this.textContent
        const terminalPrompt = document.createElement('div')
        terminalPrompt.classList.add('terminal-command')
        terminalPrompt.style.position = 'fixed'
        terminalPrompt.style.bottom = '20px'
        terminalPrompt.style.right = '20px'
        terminalPrompt.style.background = 'var(--bg-secondary)'
        terminalPrompt.style.padding = '10px'
        terminalPrompt.style.borderRadius = '5px'
        terminalPrompt.style.fontFamily = 'var(--terminal-font)'
        terminalPrompt.style.color = 'var(--accent-primary)'
        terminalPrompt.textContent = `$ ${prompt}`
        
        document.body.appendChild(terminalPrompt)
        
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
        
        setTimeout(() => {
            terminalPrompt.style.opacity = '0'
            terminalPrompt.style.transition = 'opacity 0.5s ease'
            setTimeout(() => terminalPrompt.remove(), 500)
        }, 1500)
    })
})

// Why: Add scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
        }
    })
}, observerOptions)

// Why: Initialize scroll animations for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0'
    card.style.transform = 'translateY(20px)'
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
    observer.observe(card)
})

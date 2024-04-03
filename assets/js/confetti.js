class ConfettiContext {
    constructor() {
        this.gravity = 10
        this.particle_count = 75
        this.particle_size = 1
        this.explosion_power = 25
        this.fade = false
        this.setupCanvasContext()
    }

    setupCanvasContext() {
        this.canvas = document.createElement("canvas");
        this.canvas_ctx = this.canvas.getContext("2d");
        this.canvas.width = 2 * window.innerWidth;
        this.canvas.height = 2 * window.innerHeight;
        Object.assign(this.canvas.style, {
            position: "fixed",
            top: "0",
            left: "0",
            width: "calc(100%)",
            height: "calc(100%)",
            margin: "0",
            padding: "0",
            zIndex: "999999999",
            pointerEvents: "none"
        });
        document.body.appendChild(this.canvas);
        window.addEventListener("resize", () => {
            this.canvas.width = 2 * window.innerWidth;
            this.canvas.height = 2 * window.innerHeight;
        });
    }

    clearScreen() {
        this.canvas_ctx.clearRect(0, 0, 2 * window.innerWidth, 2 * window.innerHeight);
    }

    drawRectangle(position, size, rotation, hue, opacity) {
        this.canvas_ctx.save();
        this.canvas_ctx.beginPath();
        this.canvas_ctx.translate(position.x + size.x / 2, position.y + size.y / 2);
        this.canvas_ctx.rotate(rotation * Math.PI / 180);
        this.canvas_ctx.rect(-size.x / 2, -size.y / 2, size.x, size.y);
        this.canvas_ctx.fillStyle = `hsla(${hue}deg, 90%, 65%, ${opacity}%)`;
        this.canvas_ctx.fill();
        this.canvas_ctx.restore();
    }
}

class Confetti {
    constructor() {
        this.bursts = [];
        this.time = new Date().getTime();
        this.delta_time = 0;

        this.context = new ConfettiContext()

        this.set_listeners();
        window.requestAnimationFrame(this.update.bind(this));
    }

    set_listeners() {
        const elements = document.getElementsByClassName("confetti");
        for (let element of elements) {
            element.addEventListener("click", (event) => {
                const burstPosition = new Point(2 * event.clientX, 2 * event.clientY);
                this.bursts.push(new ConfettiBurst(burstPosition, this.context));
            });
        }
    }

    update(time) {
        this.delta_time = (time - this.time) / 1000;
        this.time = time;
        for (let i = this.bursts.length - 1; i >= 0; i--) {
            this.bursts[i].update(this.delta_time);
            if (this.bursts[i].particles.length === 0) {
                this.bursts.splice(i, 1);
            }
        }
        this.draw();
        window.requestAnimationFrame(this.update.bind(this));
    }

    draw() {
        this.context.clearScreen();
        this.bursts.forEach(burst => burst.draw());
    }
}

class ConfettiBurst {
    constructor(position, context) {
        this.context = context
        this.particles = [];
        for (let i = 0; i < context.particle_count; i++) {
            this.particles.push(new TreatBurstParticle(position, context));
        }
    }

    update(time) {
        this.particles.forEach(particle => {
            particle.update(time);
            if (particle.checkBounds()) {
                this.particles.splice(this.particles.indexOf(particle), 1);
            }
        });
    }

    draw() {
        this.particles.forEach(particle => particle.draw());
    }
}

function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

class TreatBurstParticle {
    constructor(position, context) {
        this.context = context
        this.scale = 16 * Math.random() + 4
        this.size = new Point(this.scale * context.particle_size, this.scale * context.particle_size);
        this.position = new Point(position.x - this.size.x / 2, position.y - this.size.y / 2);
        this.velocity = generateVelocity(context);
        this.rotation = 360 * Math.random();
        this.rotation_speed = 10 * (Math.random() - 0.5);
        this.hue = 360 * Math.random();
        this.image = new Image();
        this.image.src = 'data:image/svg+xml,' + encodeURIComponent(`
            <svg fill="${hslToHex(this.hue, 90, 65)}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="0 0 885.851 885.851" xml:space="preserve">
                <path d="M755.125,130.775c1.399-33.9-10.8-68.2-36.7-94.1c-49.1-49.101-128.4-48.801-177.5,0.3c-38.8,38.8-47.5,96-24.2,143.6    l-336.1,336.2c-47.6-23.3-104.8-14.6-143.6,24.2c-49.1,49-49.3,128.5-0.2,177.6c25.9,25.9,60.1,38,94,36.601    c-1.4,33.899,10.8,68.2,36.7,94c49.1,49.1,128.4,48.8,177.5-0.3c38.801-38.801,47.4-96,24.101-143.601l336.1-336.1    c47.601,23.3,104.8,14.6,143.601-24.2c49.1-49.101,49.3-128.601,0.199-177.7C823.125,141.476,789.025,129.375,755.125,130.775z"/>
            </svg>
        `);
        this.opacity = 1;
        this.lifetime = Math.random() + 0.25;
    }

    update(time) {
        this.velocity.y += this.context.gravity * (this.size.y / (10 * this.context.particle_size)) * time;
        this.velocity.x += 25 * (Math.random() - 0.5) * time;
        this.velocity.y *= 0.98;
        this.velocity.x *= 0.98;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.rotation += this.rotation_speed;
        if (this.context.fade) {
            this.opacity -= this.lifetime;
        }
    }

    checkBounds() {
        return this.position.y - 2 * this.size.x > 2 * window.innerHeight;
    }

    draw() {
        if (this.image.complete) {
                let context = this.context.canvas_ctx
                let x = this.position.x
                let y = this.position.y
                context.save();
                context.translate(x, y);
                context.rotate(this.rotation * Math.PI / 180);
                context.drawImage(this.image, 0, 0, this.size.x, this.size.y);
                context.restore()
        }
    }
}

class ConfettiBurstParticle {
    constructor(position, context) {
        this.context = context
        this.size = new Point((16 * Math.random() + 4) * context.particle_size, (4 * Math.random() + 4) * context.particle_size);
        this.position = new Point(position.x - this.size.x / 2, position.y - this.size.y / 2);
        this.velocity = generateVelocity(context);
        this.rotation = 360 * Math.random();
        this.rotation_speed = 10 * (Math.random() - 0.5);
        this.hue = 360 * Math.random();
        this.opacity = 100;
        this.lifetime = Math.random() + 0.25;
    }

    update(time) {
        this.velocity.y += this.context.gravity * (this.size.y / (10 * this.context.particle_size)) * time;
        this.velocity.x += 25 * (Math.random() - 0.5) * time;
        this.velocity.y *= 0.98;
        this.velocity.x *= 0.98;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.rotation += this.rotation_speed;
        if (this.context.fade) {
            this.opacity -= this.lifetime;
        }
    }

    checkBounds() {
        return this.position.y - 2 * this.size.x > 2 * window.innerHeight;
    }

    draw() {
        this.context.drawRectangle(this.position, this.size, this.rotation, this.hue, this.opacity);
    }
}

class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

function generateVelocity(context) {
    const x = Math.random() - 0.5;
    const y = Math.random() - 0.7;
    const magnitude = Math.sqrt(x * x + y * y);
    return new Point(
        x / magnitude * (Math.random() * context.explosion_power),
        y * (Math.random() * context.explosion_power)
    );
}

c = new Confetti()
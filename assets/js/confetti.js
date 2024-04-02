class Confetti {
    static CTX = null;
    static CONFIG = {
        gravity: 10,
        particle_count: 75,
        particle_size: 1,
        explosion_power: 25,
        destroy_target: true,
        fade: false
    };

    constructor() {

        this.bursts = [];
        this.time = new Date().getTime();
        this.delta_time = 0;

        this.setupCanvasContext();
        this.set_listeners();
        window.requestAnimationFrame(this.update.bind(this));
    }

    setCount(count) {
        if (typeof count !== 'number') throw new Error("Input must be of type 'number'");
        Confetti.CONFIG.particle_count = count;
    }

    setPower(power) {
        if (typeof power !== 'number') throw new Error("Input must be of type 'number'");
        Confetti.CONFIG.explosion_power = power;
    }

    setSize(size) {
        if (typeof size !== 'number') throw new Error("Input must be of type 'number'");
        Confetti.CONFIG.particle_size = size;
    }

    setFade(fade) {
        if (typeof fade !== 'boolean') throw new Error("Input must be of type 'boolean'");
        Confetti.CONFIG.fade = fade;
    }

    destroyTarget(destroy) {
        if (typeof destroy !== 'boolean') throw new Error("Input must be of type 'boolean'");
        Confetti.CONFIG.destroy_target = destroy;
    }

    setupCanvasContext() {
        if (!Confetti.CTX) {
            const canvas = document.createElement("canvas");
            Confetti.CTX = canvas.getContext("2d");
            canvas.width = 2 * window.innerWidth;
            canvas.height = 2 * window.innerHeight;
            Object.assign(canvas.style, {
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
            document.body.appendChild(canvas);
            window.addEventListener("resize", () => {
                canvas.width = 2 * window.innerWidth;
                canvas.height = 2 * window.innerHeight;
            });
        }
    }

    set_listeners() {
        const elements = document.getElementsByClassName("confetti");
        for (let element of elements) {
            element.addEventListener("click", (event) => {
                const burstPosition = new Point(2 * event.clientX, 2 * event.clientY);
                this.bursts.push(new ConfettiBurst(burstPosition));
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
        CanvasHelper.clearScreen();
        this.bursts.forEach(burst => burst.draw());
    }
}

class ConfettiBurst {
    static CTX = null;

    constructor(position) {
        this.particles = [];
        for (let i = 0; i < Confetti.CONFIG.particle_count; i++) {
            this.particles.push(new TreatBurstParticle(position));
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
    constructor(position) {
        this.scale = 16 * Math.random() + 4
        this.size = new Point(this.scale * Confetti.CONFIG.particle_size, this.scale * Confetti.CONFIG.particle_size);
        this.position = new Point(position.x - this.size.x / 2, position.y - this.size.y / 2);
        this.velocity = generateVelocity();
        this.rotation = 360 * Math.random();
        this.rotation_speed = 10 * (Math.random() - 0.5);
        this.hue = 360 * Math.random();
        this.image = new Image();
        this.image.src = 'data:image/svg+xml,' + encodeURIComponent(`
            <svg fill="${hslToHex(this.hue, 100, 50)}" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="0 0 885.851 885.851" xml:space="preserve">
                <path d="M755.125,130.775c1.399-33.9-10.8-68.2-36.7-94.1c-49.1-49.101-128.4-48.801-177.5,0.3c-38.8,38.8-47.5,96-24.2,143.6    l-336.1,336.2c-47.6-23.3-104.8-14.6-143.6,24.2c-49.1,49-49.3,128.5-0.2,177.6c25.9,25.9,60.1,38,94,36.601    c-1.4,33.899,10.8,68.2,36.7,94c49.1,49.1,128.4,48.8,177.5-0.3c38.801-38.801,47.4-96,24.101-143.601l336.1-336.1    c47.601,23.3,104.8,14.6,143.601-24.2c49.1-49.101,49.3-128.601,0.199-177.7C823.125,141.476,789.025,129.375,755.125,130.775z"/>
            </svg>
        `);
        this.opacity = 1;
        this.lifetime = Math.random() + 0.25;
    }

    update(time) {
        this.velocity.y += Confetti.CONFIG.gravity * (this.size.y / (10 * Confetti.CONFIG.particle_size)) * time;
        this.velocity.x += 25 * (Math.random() - 0.5) * time;
        this.velocity.y *= 0.98;
        this.velocity.x *= 0.98;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.rotation += this.rotation_speed;
        if (Confetti.CONFIG.fade) {
            this.opacity -= this.lifetime;
        }
    }

    checkBounds() {
        return this.position.y - 2 * this.size.x > 2 * window.innerHeight;
    }

    draw() {
        if (this.image.complete) {
            if (Confetti.CTX) {
                let context = Confetti.CTX
                let x = this.position.x
                let y = this.position.y
                context.save();
                context.translate(x, y);
                context.rotate(this.rotation*Math.PI/180);
                context.drawImage(this.image, 0, 0, this.size.x, this.size.y);
                context.restore()
            }
        }
    }
}

class ConfettiBurstParticle {
    constructor(position) {
        this.size = new Point((16 * Math.random() + 4) * Confetti.CONFIG.particle_size, (4 * Math.random() + 4) * Confetti.CONFIG.particle_size);
        this.position = new Point(position.x - this.size.x / 2, position.y - this.size.y / 2);
        this.velocity = generateVelocity();
        this.rotation = 360 * Math.random();
        this.rotation_speed = 10 * (Math.random() - 0.5);
        this.hue = 360 * Math.random();
        this.opacity = 100;
        this.lifetime = Math.random() + 0.25;
    }

    update(time) {
        this.velocity.y += Confetti.CONFIG.gravity * (this.size.y / (10 * Confetti.CONFIG.particle_size)) * time;
        this.velocity.x += 25 * (Math.random() - 0.5) * time;
        this.velocity.y *= 0.98;
        this.velocity.x *= 0.98;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.rotation += this.rotation_speed;
        if (Confetti.CONFIG.fade) {
            this.opacity -= this.lifetime;
        }
    }

    checkBounds() {
        return this.position.y - 2 * this.size.x > 2 * window.innerHeight;
    }

    draw() {
        CanvasHelper.drawRectangle(this.position, this.size, this.rotation, this.hue, this.opacity);
    }
}

class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

function generateVelocity() {
    const x = Math.random() - 0.5;
    const y = Math.random() - 0.7;
    const magnitude = Math.sqrt(x * x + y * y);
    return new Point(
        x / magnitude * (Math.random() * Confetti.CONFIG.explosion_power),
        y * (Math.random() * Confetti.CONFIG.explosion_power)
    );
}

class CanvasHelper {
    static clearScreen() {
        if (Confetti.CTX) {
            Confetti.CTX.clearRect(0, 0, 2 * window.innerWidth, 2 * window.innerHeight);
        }
    }

    static drawRectangle(position, size, rotation, hue, opacity) {
        if (Confetti.CTX) {
            Confetti.CTX.save();
            Confetti.CTX.beginPath();
            Confetti.CTX.translate(position.x + size.x / 2, position.y + size.y / 2);
            Confetti.CTX.rotate(rotation * Math.PI / 180);
            Confetti.CTX.rect(-size.x / 2, -size.y / 2, size.x, size.y);
            Confetti.CTX.fillStyle = `hsla(${hue}deg, 90%, 65%, ${opacity}%)`;
            Confetti.CTX.fill();
            Confetti.CTX.restore();
        }
    }
}

c = new Confetti()
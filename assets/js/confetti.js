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
        let context = this.context.canvas_ctx
        let x = this.position.x
        let y = this.position.y
        context.save();
        context.translate(x, y);
        context.scale(this.size.x / 800, this.size.y / 800)
        context.rotate(this.rotation * Math.PI / 180);
        context.beginPath();
        context.fillStyle = `hsla(${this.hue}deg, 90%, 65%, ${this.opacity}%)`;
        // Generated using inkscape
        context.moveTo(755.125000, 130.775000);
        context.bezierCurveTo(756.524000, 96.875000, 744.325000, 62.575000, 718.425000, 36.675000);
        context.bezierCurveTo(669.325000, -12.426000, 590.025000, -12.126000, 540.925000, 36.975000);
        context.bezierCurveTo(502.125000, 75.775000, 493.425000, 132.975000, 516.725000, 180.575000);
        context.lineTo(180.625000, 516.775000);
        context.bezierCurveTo(133.025000, 493.475000, 75.825000, 502.175000, 37.025000, 540.975000);
        context.bezierCurveTo(-12.075000, 589.975000, -12.275000, 669.475000, 36.825000, 718.575000);
        context.bezierCurveTo(62.725000, 744.475000, 96.925000, 756.575000, 130.825000, 755.176000);
        context.bezierCurveTo(129.425000, 789.075000, 141.625000, 823.376000, 167.525000, 849.176000);
        context.bezierCurveTo(216.625000, 898.276000, 295.925000, 897.976000, 345.025000, 848.876000);
        context.bezierCurveTo(383.826000, 810.075000, 392.425000, 752.876000, 369.126000, 705.275000);
        context.lineTo(705.226000, 369.175000);
        context.bezierCurveTo(752.827000, 392.475000, 810.026000, 383.775000, 848.827000, 344.975000);
        context.bezierCurveTo(897.927000, 295.874000, 898.127000, 216.374000, 849.026000, 167.275000);
        context.bezierCurveTo(823.125000, 141.476000, 789.025000, 129.375000, 755.125000, 130.775000);
        context.closePath();
        context.fill();
        context.restore()

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

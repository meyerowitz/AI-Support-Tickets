"use client";
import { useEffect, useRef } from 'react';

export default function Orb({
  hue = 0,
  hoverIntensity = 0.2,
  rotateOnHover = true,
  forceHoverState = false,
  backgroundColor = 'transparent' // Lo cambiamos a transparente para que herede tu fondo
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // --- CÓDIGO DEL SHADER DE REACT BITS ---
    const vertexShaderSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      varying vec2 vUv;
      uniform float time;
      uniform vec2 resolution;
      uniform float hue;
      uniform float hover;

      // Conversión de HSL a RGB para el color del Orb
      vec3 hsl2rgb(vec3 c) {
        vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0);
        return c.z + c.y * (rgb-0.5)*(1.0-abs(2.0*c.z-1.0));
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / resolution.y;
        float d = length(uv);
        
        // Distorsión matemática orgánica para el efecto "líquido/glowing"
        float wave = sin(d * 10.0 - time * 2.0 + hover * 5.0) * 0.05;
        float strength = 0.15 / (d + wave);
        
        // Color basado en el Hue que le pases por props
        vec3 color = hsl2rgb(vec3(hue / 360.0, 0.8, 0.6)) * strength;
        
        // Difuminado de los bordes
        float alpha = smoothstep(0.5, 0.0, d);
        gl_FragColor = vec4(color, alpha * 0.8);
      }
    `;

    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexVariable = gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, 'time');
    const resLoc = gl.getUniformLocation(program, 'resolution');
    const hueLoc = gl.getUniformLocation(program, 'hue');
    const hoverLoc = gl.getUniformLocation(program, 'hover');

    let animationFrameId;
    let startTime = performance.now();
    let currentHover = forceHoverState ? 1.0 : 0.0;

    // Manejo de interactividad (Mouse over)
    const handleMouseMove = () => { if (!forceHoverState) currentHover = hoverIntensity; };
    const handleMouseLeave = () => { if (!forceHoverState) currentHover = 0.0; };
    
    if (rotateOnHover) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
    }

    function resize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    window.addEventListener('resize', resize);
    resize();

    function render() {
      const now = performance.now();
      gl.uniform1f(timeLoc, (now - startTime) * 0.001);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(hueLoc, hue);
      gl.uniform1f(hoverLoc, currentHover);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    }
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hue, hoverIntensity, rotateOnHover, forceHoverState]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ width: '100%', height: '100%', backgroundColor }} 
    />
  );
}
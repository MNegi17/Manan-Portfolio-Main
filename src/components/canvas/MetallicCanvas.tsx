"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const MetallicCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Create 3D Metallic Geometry (TorusKnot with smooth detail)
    const geometry = new THREE.TorusKnotGeometry(1.4, 0.45, 96, 24, 2, 3);

    // Shader-like physical metallic material
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x111111,
      metalness: 0.95,
      roughness: 0.1,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
      wireframe: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Inner wireframe glow layer for depth
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial);
    wireframeMesh.scale.set(1.02, 1.02, 1.02);
    scene.add(wireframeMesh);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x666666, 2.0);
    dirLight2.position.set(-5, -5, -2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 3.0, 10);
    pointLight.position.set(0, 0, 4);
    scene.add(pointLight);

    // Mouse Interaction
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 2;
      targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Pause rendering when offscreen for buttery smooth page scrolling
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      if (isVisible) {
        const elapsedTime = clock.getElapsedTime();

        // Smooth interpolation for mouse follow
        currentX += (targetX - currentX) * 0.04;
        currentY += (targetY - currentY) * 0.04;

        // Object rotation & subtle floating oscillation
        mesh.rotation.x = elapsedTime * 0.2 + currentY * 0.8;
        mesh.rotation.y = elapsedTime * 0.25 + currentX * 0.8;
        mesh.position.y = Math.sin(elapsedTime * 1.5) * 0.15;

        wireframeMesh.rotation.x = mesh.rotation.x;
        wireframeMesh.rotation.y = mesh.rotation.y;
        wireframeMesh.position.y = mesh.position.y;

        renderer.render(scene, camera);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      wireframeMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-85"
    />
  );
};

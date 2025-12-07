"use client";
import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function CameraController() {
  const { camera, gl } = useThree();
  const mouseX = useRef(0);
  const gyroX = useRef(0);
  const targetRotation = useRef(0);
  const currentRotation = useRef(0);
  const idleSway = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const [gyroSupported, setGyroSupported] = useState(false);
  const touchStartX = useRef(0);
  const lastTouchX = useRef(0);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Gyroscope support detection and setup
  useEffect(() => {
    if (!isMobile) return;

    const requestGyroPermission = async () => {
      try {
        if (typeof DeviceOrientationEvent !== "undefined" &&
            typeof (DeviceOrientationEvent as any).requestPermission === "function") {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === "granted") {
            setGyroSupported(true);
          }
        } else if (typeof DeviceOrientationEvent !== "undefined") {
          // iOS 12.2+ or non-iOS devices
          setGyroSupported(true);
        }
      } catch (error) {
        console.log("Gyroscope permission denied or not supported");
      }
    };

    // Request permission on first touch
    const handleFirstTouch = () => {
      requestGyroPermission();
      document.removeEventListener("touchstart", handleFirstTouch);
    };

    document.addEventListener("touchstart", handleFirstTouch);

    return () => document.removeEventListener("touchstart", handleFirstTouch);
  }, [isMobile]);

  // Gyroscope event handler
  useEffect(() => {
    if (!gyroSupported) return;

    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma !== null) {
        // gamma is left-to-right tilt (-90 to 90)
        // Convert to -1 to 1 range and constrain
        const normalizedGamma = THREE.MathUtils.clamp(event.gamma / 45, -1, 1);
        gyroX.current = normalizedGamma * 0.6; // Reduced sensitivity for mobile
      }
    };

    window.addEventListener("deviceorientation", handleDeviceOrientation, { passive: true });

    return () => window.removeEventListener("deviceorientation", handleDeviceOrientation);
  }, [gyroSupported]);

  // Mouse and touch controls
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isMobile) return; // Skip mouse on mobile

      const x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseX.current = THREE.MathUtils.clamp(x, -0.785, 0.785);
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        touchStartX.current = event.touches[0].clientX;
        lastTouchX.current = event.touches[0].clientX;
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const deltaX = touch.clientX - lastTouchX.current;
        lastTouchX.current = touch.clientX;

        // Convert touch delta to rotation
        const sensitivity = isMobile ? 0.003 : 0.002;
        mouseX.current = THREE.MathUtils.clamp(
          mouseX.current + deltaX * sensitivity,
          -0.785,
          0.785
        );
      }
    };

    // Mouse events (desktop only)
    if (!isMobile) {
      gl.domElement.addEventListener("mousemove", handleMouseMove);
      gl.domElement.addEventListener("mouseleave", () => {
        mouseX.current = 0;
      });
    }

    // Touch events (all devices)
    gl.domElement.addEventListener("touchstart", handleTouchStart, { passive: true });
    gl.domElement.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      gl.domElement.removeEventListener("mousemove", handleMouseMove);
      gl.domElement.removeEventListener("touchstart", handleTouchStart);
      gl.domElement.removeEventListener("touchmove", handleTouchMove);
    };
  }, [gl.domElement, isMobile]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Combine mouse/touch and gyroscope inputs
    let inputValue = mouseX.current;

    if (gyroSupported && isMobile) {
      // Blend gyroscope and touch inputs on mobile
      inputValue = mouseX.current * 0.7 + gyroX.current * 0.3;
    }

    // Calculate target rotation
    targetRotation.current = inputValue * 0.8;

    // Smooth interpolation to target rotation
    currentRotation.current = THREE.MathUtils.lerp(
      currentRotation.current,
      targetRotation.current,
      isMobile ? 0.08 : 0.05 // Slower interpolation on mobile for smoother feel
    );

    // Add subtle idle sway when no input
    const hasInput = Math.abs(inputValue) > (isMobile ? 0.05 : 0.1);
    if (!hasInput) {
      idleSway.current = Math.sin(time * 0.3) * 0.02;
    } else {
      idleSway.current = THREE.MathUtils.lerp(idleSway.current, 0, 0.02);
    }

    // Apply rotation to camera
    camera.rotation.y = currentRotation.current + idleSway.current;

    // Ensure camera stays at fixed position
    camera.position.set(0, 1.6, 0);
    camera.updateMatrixWorld();
  });

  return null;
}

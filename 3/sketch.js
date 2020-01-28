var renderer = new THREE.WebGLRenderer({ antialias: true });
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75);
var teture;
var rotation = new THREE.Euler();

setup();

function setup() {

  camera.rotation.order = 'YXZ';
  camera.position.z = 2;

  document.body.appendChild(renderer.domElement);

  var two = new Two({
    type: Two.Types.canvas,
    width: 512,
    height: 512
  });

  var text = two.makeText('TRUST', two.width / 2, two.height / 2, {
    family: 'sans-serif',
    size: 36,
    weight: 700,
    alignment: 'center',
    baseline: 'center',
    fill: 'white',
    stroke: 'transparent'
  });

  text.rotation = - Math.PI / 4;

  var rect = text.getBoundingClientRect();
  text.scale = (two.width * 0.75) / rect.width;

  two.update();

  texture = new THREE.Texture(two.renderer.domElement);
  texture.repeat.set(32, 8);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;

  var left = new THREE.Mesh(
    new THREE.TorusBufferGeometry(3, 0.5, 128, 128),
    new THREE.MeshBasicMaterial({
      color: 'white',
      map: texture
    })
  );

  var right = new THREE.Mesh(
    new THREE.TorusBufferGeometry(3, 0.5, 128, 128),
    new THREE.MeshBasicMaterial({
      color: 'white',
      map: texture
    })
  );

  left.rotation.x = - Math.PI / 12;
  left.position.x += 2.5;

  right.rotation.x = Math.PI / 12;
  right.position.x -= 2.5;

  scene.add(left, right);

  resize();

  window.addEventListener('resize', resize, false);
  renderer.domElement.addEventListener('mousemove', mousemove, false);
  renderer.setAnimationLoop(draw);

}

function resize() {

  var width = window.innerWidth;
  var height = window.innerHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

}

function mousemove(e) {

  var x = - 2 * (e.clientX / window.innerWidth - 0.5);
  var y = - 2 * (e.clientY / window.innerHeight - 0.5);

  rotation.y = x * Math.PI / 20;
  rotation.x = y * Math.PI / 20;

}

function draw(elapsed) {

  var t = (elapsed % 1000) / 1000;

  t = Math.sin(Math.PI * t);
  t = Math.pow(t, 4);

  texture.offset.x -= 0.05 * t;
  texture.offset.y -= 0.05 * t;

  camera.rotation.x += (rotation.x - camera.rotation.x) * 0.33;
  camera.rotation.y += (rotation.y - camera.rotation.y) * 0.33;

  renderer.render(scene, camera);

}

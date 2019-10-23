
    const scene = new THREE.Scene();

    const  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

    const width = window.innerWidth;
    const height = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
        
    });
        renderer.setSize( width, height );
        // document.body.appendChild(renderer.domElement );
        
        window.addEventListener('resize',function(){
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize( width, height );
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });

        

    //create the shape
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );

    //create material, coloer or image texture
    const material = new THREE.MeshBasicMaterial( { color:0xFFFFFF, wireframe: true} );

    const cube =new THREE.Mesh( geometry, material );

    scene.add( cube );

    camera.position.z = 3;

    //game logic
    let updated = function() {
        cube.rotation.x +=0.01;
        cube.rotation.y +=0.005;
    };

    //drow scene
    let render = function() {
        renderer.render( scene, camera );
    };

    //run game loop ( update, render, repat )
    let GameLoop = function(){
        requestAnimationFrame( GameLoop );

        updated();
        render();

    };

    GameLoop();
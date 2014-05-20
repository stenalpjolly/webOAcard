OA.Point = function(userSetting) {

    THREE.Object3D.call(this);
    var colorMap = [0x074CA6, 0xD02C55, 0x5F8A37, 0x5F8A37];
    //private
    var _def = {
        "scale": 1,
        "border": {
            color: colorMap[0],
            opacity: 1,
            size: 1.8
        },
        "inner": {
            color: 0xff0000,
            opacity: 0.5,
            size: 1
        }
    };
   
    var _setting = $.extend({}, _def, userSetting);
    var point = this;
    var position3D = THREE.Vector3();
    var borderMaterial;
    var innerMaterial;
    var init = function() {
        var movePointSetting = _setting;
        var movePointTexture = OA.Utils.texture.getTexture().movePointTexture;
        var movePointFillTexture = OA.Utils.texture.getTexture().movePointFillTexture;
        var innerSettng = movePointSetting.inner;
        var borderSetting = movePointSetting.border;
        borderMaterial = new THREE.SpriteMaterial({
            map: movePointTexture,
            transparent: true,
            opacity: borderSetting.opacity,
            useScreenCoordinates: false,
            color: borderSetting.color,
            depthTest: false,
            depthWrite: false
        });

        var particle = new THREE.Particle(borderMaterial);
        particle.scale.x = particle.scale.y = particle.scale.z = _setting.scale * borderSetting.size;
        particle.name = "border";
        var particle2 = particle.clone();
        innerMaterial = new THREE.SpriteMaterial({
            map: movePointFillTexture,
            transparent: true,
            opacity: innerSettng.opacity,
            useScreenCoordinates: false,
            color: innerSettng.color,
            depthTest: false,
            depthWrite: false
        });
        particle2.material = innerMaterial;
        particle2.scale.x = particle2.scale.y = particle2.scale.z = _setting.scale * innerSettng.size;
        particle.name = "inner";
        //material.color.setHex( 0xff0000 );

        var particles = new THREE.ParticleSystem();
        particles.add(particle);
        particles.add(particle2);
        point.add(particles);

        return point;
    };
    this.isEqualPosition = function(pos){
        if(position3D === undefined){
            return false;
        }
        if(position3D.x === pos.x && 
           position3D.y === pos.y &&
           position3D.z === pos.z){
            return true;
        }else{
            return false;
        }
    };

    this.setPosition3D = function(hoverPos) {
        position3D = hoverPos.clone();
        point.position = hoverPos.clone();
        point.position.z = point.position.z + 0.3;
    };

    this.getPosition3D = function(){
        return position3D;
    };

    this.getPosition2D = function(){
        return new THREE.Vector2(position3D.x, position3D.z - position3D.y);
    };

    this.getT = function(){
        return position3D.z;
    };

    this.setBorderColor = function(color){
        borderMaterial.color.setHex( 0xff0000 );
    };

    this.setColor = function(index) {
        if (index < colorMap.length) {
            borderMaterial.color.setHex(colorMap[index]);
        }
    };


    this.setVisible = function(isVisible){
        OA.Utils.setObject3DVisible(point, isVisible);
    };

    return init();
};

OA.Point.prototype = Object.create(THREE.Object3D.prototype);
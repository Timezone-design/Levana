<!doctype html>
<html lang="<?php echo e(str_replace('_', '-', app()->getLocale())); ?>">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">

    <title><?php echo e(config('app.name', 'Laravel')); ?></title>

    <!-- Scripts -->
    <script src="<?php echo e(asset('js/app.js')); ?>" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&amp;display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&amp;display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&amp;display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    
    
    <!-- Styles -->
    <link href="<?php echo e(asset('css/app.css')); ?>" rel="stylesheet">
    <style>
       
    a.selected {
    background: #fff;
    border-radius: .25rem;
    color: #999;
    }
    a.unselected {
    color: #999;
    }
    #logo {
                font-family:'Josefin Sans', sans-serif !important;
    }
    </style>
</head>
<body>
    <div id="app" style="background:white;">
        

        <main class="py-4">
            <?php echo $__env->yieldContent('content'); ?>
        </main>
    </div>
    <script>
        function registerToggle(item){
        
        console.log(item);
        $("#togglebar a").removeClass('selected');
        $("#togglebar a#"+item).addClass('selected');
        $("#accountType").val(item);
        if(item=='client'){
            $("div#accountAlert p").text('You are registering as an Client');
            $("#gender-selection").hide();
            $("#gender0").attr('checked','checked');
            }
        else{
            $("div#accountAlert p").text('You are registering as a Escort');
            $("#gender-selection").show();
            $("#gender0").removeAttr('checked');
            }
        }
        // function checkSession(){
        //     if(sessionStorage.getItem('type')){
        //         const type=sessionStorage.getItem('type');
        //         if(type=='escort')registerToggle('escort')
        //     }
        //     sessionStorage.clear()
        // }

    </script>
</body>
</html>
<?php /**PATH E:\Projects\Laravel-dating-site\resources\views/layouts/app.blade.php ENDPATH**/ ?>
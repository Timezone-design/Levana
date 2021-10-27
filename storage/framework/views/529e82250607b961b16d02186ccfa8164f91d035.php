

<?php $__env->startSection('content'); ?>
<div class="max-full md:max-w-xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="w-full">
        <a href="<?php echo e(url('/')); ?>" class="block mx-auto mb-6" style="max-width: 150px;">
            <h1 class="text-pink-450 text-5xl" id="logo">Levana</h1>
        </a>
    </div>
    <div class="w-11/12 mx-auto bg-gray-100 rounded-2xl py-3" style="font-family:'Poppins', sans-serif">
        <div class="w-11/12 mx-auto">
            <p class="text-center text-xl font-semibold text-pink-450" style="font-weight: 600;">New User Registration</p>
            <hr style="height: 1px; background:pink;margin-top: 5px;">
            <div class="py-6 sm:px-0 w-full mx-auto">
                <form method="POST" action="<?php echo e(route('register')); ?>">
                    <?php echo csrf_field(); ?>
                    <div id="togglebar" class="relative w-full mx-auto rounded bg-gray-300">
                      <div class="flex justify-between">
                          <div class="px-2 py-2 w-1/2">
                              <a style="display: block;text-align:center;height:30px;line-height:30px;" class="selected text-sm md:text-md font-semibold" id="client" onclick="registerToggle('client')">Client</a>
                          </div>
                          <div class="px-2 py-2 w-1/2">
                              <a style="display: block;text-align:center;height:30px;line-height:30px;" class="text-sm md:text-md font-semibold" id="escort" onclick="registerToggle('escort')">Escort</a>
                          </div>
                      </div>
                      <div class="clearfix"></div>
                  </div>
                  <div id="accountAlert" class="text-xs mt-2"><p style="font-weight: 500; font-size:0.9rem;">You are registering as an Client</p></div>
                   <div id="radio-btn">
                    <input type="text" name="accounttype" id="accounttype" value="client" hidden="">
                  </div>



                    <label class="block mb-8">
                        <input id="fullname" type="text" class="h-10 form-input mt-2 block w-full <?php $__errorArgs = ['fullname'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?> is-invalid <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>" name="fullname" value="<?php echo e(old('fullname')); ?>" required autofocus placeholder="Preferred Name" style="border:1px solid #999; padding:25px 15px;">
                            <?php $__errorArgs = ['fullname'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?>
                                <span class="invalid-feedback" role="alert">
                                     <strong><?php echo e($message); ?></strong>
                                </span>
                            <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>
                    </label>
                    <label class="block mb-8">
                        <input id="name" type="text" class="h-10 form-input mt-2 block w-full <?php $__errorArgs = ['name'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?> is-invalid <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>" name="name" value="<?php echo e(old('name')); ?>" required autofocus placeholder="Username" style="border:1px solid #999; padding:25px 15px;">
                            <?php $__errorArgs = ['name'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?>
                                <span class="invalid-feedback" role="alert">
                                     <strong><?php echo e($message); ?></strong>
                                </span>
                            <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>
                    </label>

                  <label class="block mb-8">
                      <input id="email" type="email" class="h-10 form-input mt-2 block w-full <?php $__errorArgs = ['email'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?> is-invalid <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>" name="email" value="<?php echo e(old('email')); ?>" autocomplete="email" required autofocus placeholder="E-mail" style="border:1px solid #999; padding:25px 15px;">
                            <?php $__errorArgs = ['email'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?>
                                <span class="invalid-feedback" role="alert">
                                   <strong><?php echo e($message); ?></strong>
                                </span>
                            <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>
                                        </label>
                  <label class="block mb-8">
                      <input id="password" type="password" class="h-10 form-input mt-2 block w-full <?php $__errorArgs = ['password'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?> is-invalid <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>" name="password" required autocomplete="new-password" placeholder="Password" style="border:1px solid #999; padding:25px 15px;">
                            <?php $__errorArgs = ['password'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?>
                                <span class="invalid-feedback" role="alert">
                                    <strong><?php echo e($message); ?></strong>
                                </span>
                            <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>
                                        </label>
                  <label class="block mb-2">
                      <input id="password-confirm" type="password" class="h-10 form-input mt-2 block w-full " name="password_confirmation" required autocomplete= "new-password" placeholder="Confirm Password" style="border:1px solid #999; padding:25px 15px;">
                                        </label>

                                        <label class="block mb-4 mt-3" id="gender-selection" style="display: none; ">
                                            <div style="display: flex;justify-content: space-between; align-items: center;flex-direction: row;
                                    flex-wrap: nowrap;align-content: stretch;">
                                <span style="font-family: 'Poppins', sans-serif; color: gray; float: left;font-size: 1rem;">Gender:</span>
                                <input id="gender1" type="radio" name="gender" value="Male" style="font-family: 'Poppins', sans-serif; border:1px solid #999; width: 15px !important; margin-top:0px !important;"><span style="float: left; font-family: 'Poppins', sans-serif; font-size: 1rem;">Male</span>
                                <input id="gender2" type="radio" name="gender" value="Transsexual" style="font-family: 'Poppins', sans-serif; border:1px solid #999; width: 15px !important; margin-top:0px !important;"><span style=" font-family: 'Poppins', sans-serif;float: left;font-size: 1rem;">Transsexual</span>
                                <input id="gender3" type="radio" name="gender" value="Female" style="font-family: 'Poppins', sans-serif; border:1px solid #999; width: 15px !important; margin-top:0px !important;"><span style=" font-family: 'Poppins', sans-serif;float: left;font-size: 1rem;">Female</span>
                            </div>
                        </label>
                        <div>
                            <label class="flex items-center font-bold text-xs">
                                <input type="checkbox" class="form-checkbox" name="agreement" required >
                                <span class="ml-2" style="color: #999; font-size:1rem;">I agree to the <span class="text-pink-500">Terms &amp; Conditions</span></span>
                            </label>
                            <div></div>
                        </div>
                        <div class="flex mt-6 w-4/5 mx-auto">
                            <button type="submit" class="w-full appearance-none text-white text-base font-semibold tracking-wide p-2 rounded bg-pink-450"> Register </button>
                        </div>
                        <input id="gender0" type="radio" name="gender" hidden checked="checked" value="Male">
                    </form>
                </div>
            </div>
        </div>
    </div>
    <script>
        function registerToggle(item){
        
        console.log(item);
        $("#togglebar a").removeClass('selected');
        $("#togglebar a#"+item).addClass('selected');
        $("#accounttype").val(item);
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
        
    </script>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH D:\Project\datingapp\Laravel-dating-site\resources\views/auth/register.blade.php ENDPATH**/ ?>
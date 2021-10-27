

<?php $__env->startSection('content'); ?>

<div class="max-full md:max-w-xl mx-auto py-6 sm:px-6 lg:px-8 mt-20">
    <div class="w-full">
        <a href="<?php echo e(url('/')); ?>" class="block mx-auto mb-6" style="max-width: 150px;">
            <h1 class="text-pink-450 text-5xl" id="logo">Levana</h1>
        </a>
    </div>
        <div class="w-11/12 mx-auto bg-gray-100 rounded-2xl py-3" style="font-family: 'Poppins', sans-serif;">
            <div class="w-11/12 mx-auto">
                <!-- Replace with your content -->
                <p class="text-center text-2xl">Welcome Back</p>
                <hr style="height: 1px; background:pink;margin-top: 5px;">
                <div class="py-6 sm:px-0 w-full mx-auto">
                  <form method="POST" action="<?php echo e(route('login')); ?>" class="mx-auto">
                  <?php echo csrf_field(); ?>
                      <label class="block mb-8">
                          <input id="email" type="email" class="h-10 form-input mt-2 block w-full <?php $__errorArgs = ['email'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?> is-invalid <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>" name="email" value="<?php echo e(old('email')); ?>" required autocomplete="email" autofocus placeholder="Email" style="border:1px solid #999; padding:25px 15px;">
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
                                                
                      <label class="block mb-6">
                          <input id="password" type="password" class="h-10 form-input mt-2 block w-full <?php $__errorArgs = ['password'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?> is-valid <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>" name="password" required autocomplete="current-password" placeholder="Password" style="border:1px solid #999; padding: 25px 15px;">
                                                </label>
                      <div class="flex justify-between mt-2">
                          <div>
                              <label class="flex items-center">
                                <input class="form-checkbox" type="checkbox" name="remember" id="remember" <?php echo e(old('remember') ? 'checked': ''); ?>>
                                <span class="ml-2 text-sm"><?php echo e(__('Remember Me')); ?></span>
                              </label>
                          </div>
                          <div>
                                <label class="flex items-center">
                                    <?php if(Route::has('password.request')): ?>
                                        <a class="text-sm text-pink-450" href="<?php echo e(route('password.request')); ?>">
                                            <?php echo e(__('Forgot Your Password?')); ?>

                                        </a>
                                    <?php endif; ?>
                                </label>
                                                      </div>
                      </div>
                      <div class="flex mt-6 w-2/3 mx-auto">
                          <button type="submit" class="w-full appearance-none text-white text-lg md:text-xl font-semibold tracking-wide rounded bg-pink-450" style="padding:15px;"> <?php echo e(__('Sign In')); ?> </button>
                      </div>
                  </form>
                </div>
                <!-- /End replace -->
            </div>
        </div>
        <div class="mt-8 text-center">
                            <p class="text-sm">Don`t have an account?<a href="<?php echo e(route('register')); ?>" class="text-pink-500">&nbsp;&nbsp;<?php echo e(__('Sign Up')); ?></a></p>
                    </div>
    </div>

<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH E:\Projects\Laravel-dating-site\resources\views/auth/login.blade.php ENDPATH**/ ?>
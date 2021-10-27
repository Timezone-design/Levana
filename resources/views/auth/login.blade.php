@extends('layouts.app')

@section('content')

<div class="max-full md:max-w-xl mx-auto py-6 sm:px-6 lg:px-8 mt-20">
    <div class="w-full">
        <a href="{{ url('/') }}" class="block mx-auto mb-6" style="max-width: 150px;">
            <h1 class="text-yellow-500 text-5xl" id="logo">Levana</h1>
        </a>
    </div>
        <div class="w-11/12 mx-auto bg-gray-100 rounded-2xl py-3" style="font-family: 'Poppins', sans-serif;">
            <div class="w-11/12 mx-auto">
                <!-- Replace with your content -->
                <p class="text-center text-2xl">Welcome Back</p>
                <hr style="height: 1px; background:#f59e0b;margin-top: 5px;">
                <div class="py-6 sm:px-0 w-full mx-auto">
                  <form method="POST" action="{{ route('login') }}" class="mx-auto">
                  @csrf
                      <label class="block mb-8">
                          <input id="email" type="email" class="h-10 form-input mt-2 block w-full @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus placeholder="Email" style="border:1px solid #999; padding:25px 15px;">
                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                     <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                        </label>
                                                
                      <label class="block mb-6">
                          <input id="password" type="password" class="h-10 form-input mt-2 block w-full @error('password') is-valid @enderror" name="password" required autocomplete="current-password" placeholder="Password" style="border:1px solid #999; padding: 25px 15px;">
                                                </label>
                      <div class="flex justify-between mt-2">
                          <div>
                              <label class="flex items-center">
                                <input class="form-checkbox" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked': '' }}>
                                <span class="ml-2 text-sm">{{ __('Remember Me') }}</span>
                              </label>
                          </div>
                          <div>
                                <label class="flex items-center">
                                    @if (Route::has('password.request'))
                                        <a class="text-sm text-yellow-500" href="{{ route('password.request') }}">
                                            {{ __('Forgot Your Password?') }}
                                        </a>
                                    @endif
                                </label>
                                                      </div>
                      </div>
                      <div class="flex mt-6 w-2/3 mx-auto">
                          <button type="submit" class="w-full appearance-none text-white text-lg md:text-xl font-semibold tracking-wide rounded bg-yellow-500" style="padding:15px;"> {{ __('Sign In') }} </button>
                      </div>
                  </form>
                </div>
                <!-- /End replace -->
            </div>
        </div>
        <div class="mt-8 text-center">
                            <p class="text-sm">Don`t have an account?<a href="{{ route('register') }}" class="text-yellow-500">&nbsp;&nbsp;{{ __('Sign Up') }}</a></p>
                    </div>
    </div>

@endsection

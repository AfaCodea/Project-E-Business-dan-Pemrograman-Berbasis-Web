<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>e-PPPK Portal - BDO Indonesia</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .navbar-brand {
            font-weight: 700;
            font-size: 1.5rem;
        }
        .card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        .btn-primary {
            background: linear-gradient(45deg, #007bff, #0056b3);
            border: none;
            border-radius: 25px;
            padding: 10px 25px;
            font-weight: 500;
        }
        .btn-primary:hover {
            background: linear-gradient(45deg, #0056b3, #004085);
            transform: translateY(-2px);
        }
        .feature-icon {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 15px;
        }
        .app-card {
            transition: all 0.3s ease;
            border-radius: 12px;
        }
        .app-card:hover {
            transform: translateY(-3px);
        }
        .category-header {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border-radius: 10px;
            padding: 15px 20px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <!-- Bootstrap Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-lg">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="#">
                <div class="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 50px; height: 50px;">
                    <i class="fas fa-building text-white fs-4"></i>
                </div>
                <div>
                    <div class="fw-bold text-primary">e-PPPK</div>
                    <small class="text-muted">Portal Aplikasi Terpadu</small>
                </div>
            </a>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    @auth
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                                <div class="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2" style="width: 32px; height: 32px;">
                                    <i class="fas fa-user text-white"></i>
                                </div>
                                {{ auth()->user()->name }}
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#"><i class="fas fa-user me-2"></i>Profile</a></li>
                                <li><a class="dropdown-item" href="#"><i class="fas fa-cog me-2"></i>Settings</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li>
                                    <form method="POST" action="{{ route('logout') }}" class="d-inline">
                                        @csrf
                                        <button type="submit" class="dropdown-item text-danger">
                                            <i class="fas fa-sign-out-alt me-2"></i>Logout
                                        </button>
                                    </form>
                                </li>
                            </ul>
                        </li>
                    @else
                        <li class="nav-item">
                            <a href="{{ route('login') }}" class="btn btn-primary">
                                <i class="fas fa-sign-in-alt me-2"></i>Login
                            </a>
                        </li>
                    @endauth
                </ul>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="container my-5">
        <!-- Welcome Section -->
        <div class="card mb-5">
            <div class="card-body text-center py-5">
                <h1 class="display-4 fw-bold text-primary mb-4">Welcome to e-PPPK</h1>
                <p class="lead text-muted mb-5">
                    e-PPPK is new implementation of Single Sign-On (SSO) and Application Portal.
                </p>
                <div class="row justify-content-center">
                    <div class="col-md-4 mb-4">
                        <div class="feature-icon bg-primary bg-gradient">
                            <i class="fas fa-shield-alt text-white fs-3"></i>
                        </div>
                        <h5 class="fw-bold">Secure SSO</h5>
                        <p class="text-muted">Advanced security with single sign-on authentication</p>
                    </div>
                    <div class="col-md-4 mb-4">
                        <div class="feature-icon bg-success bg-gradient">
                            <i class="fas fa-th-large text-white fs-3"></i>
                        </div>
                        <h5 class="fw-bold">Unified Portal</h5>
                        <p class="text-muted">Access all applications from one central location</p>
                    </div>
                    <div class="col-md-4 mb-4">
                        <div class="feature-icon bg-info bg-gradient">
                            <i class="fas fa-users text-white fs-3"></i>
                        </div>
                        <h5 class="fw-bold">User Management</h5>
                        <p class="text-muted">Comprehensive user and permission management</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Applications Grid -->
        @if(isset($applications) && $applications->count() > 0)
            @foreach($applications as $category => $apps)
                <div class="mb-5">
                    <div class="category-header text-white mb-4">
                        <h3 class="h4 fw-bold mb-0 text-capitalize">
                            <i class="fas fa-folder me-2"></i>{{ $category }}
                        </h3>
                    </div>
                    <div class="row g-4">
                        @foreach($apps as $app)
                            <div class="col-lg-3 col-md-4 col-sm-6">
                                <div class="card app-card h-100">
                                    <div class="card-body d-flex flex-column">
                                        <div class="d-flex align-items-center mb-3">
                                            @if($app->icon)
                                                <img src="{{ $app->icon }}" alt="{{ $app->name }}" class="rounded me-3" style="width: 48px; height: 48px; object-fit: cover;">
                                            @else
                                                <div class="bg-gradient bg-primary rounded d-flex align-items-center justify-content-center me-3" style="width: 48px; height: 48px;">
                                                    <i class="fas fa-cube text-white"></i>
                                                </div>
                                            @endif
                                            <div class="flex-grow-1">
                                                <h5 class="card-title mb-1">{{ $app->name }}</h5>
                                                @if($app->requires_sso)
                                                    <span class="badge bg-success">
                                                        <i class="fas fa-shield-alt me-1"></i>SSO
                                                    </span>
                                                @endif
                                            </div>
                                        </div>
                                        @if($app->description)
                                            <p class="card-text text-muted small mb-3 flex-grow-1">{{ Str::limit($app->description, 100) }}</p>
                                        @endif
                                        <div class="d-flex justify-content-between align-items-center mt-auto">
                                            @if($app->requires_sso)
                                                <a href="{{ route('sso', $app->slug) }}" class="btn btn-primary btn-sm">
                                                    <i class="fas fa-external-link-alt me-1"></i>Launch
                                                </a>
                                            @else
                                                <a href="{{ $app->url }}" target="_blank" class="btn btn-secondary btn-sm">
                                                    <i class="fas fa-external-link-alt me-1"></i>Open
                                                </a>
                                            @endif
                                            <small class="text-muted">
                                                <i class="fas fa-clock me-1"></i>{{ $app->updated_at->diffForHumans() }}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            @endforeach
        @else
            <div class="card text-center">
                <div class="card-body py-5">
                    <i class="fas fa-inbox text-muted display-1 mb-4"></i>
                    <h3 class="card-title h4 text-muted mb-3">No Applications Available</h3>
                    <p class="card-text text-muted">Applications will appear here once they are configured.</p>
                    @auth
                        @if(auth()->user()->email === 'admin@example.com')
                            <a href="{{ route('filament.bdo.pages.dashboard') }}" class="btn btn-primary mt-3">
                                <i class="fas fa-cog me-2"></i>Manage Applications
                            </a>
                        @endif
                    @endauth
                </div>
            </div>
        @endif
    </main>

    <!-- Bootstrap Footer -->
    <footer class="bg-white border-top mt-5">
        <div class="container py-4">
            <div class="row align-items-center">
                <div class="col-md-6">
                    <p class="text-muted mb-0">&copy; {{ date('Y') }} BDO Indonesia. All rights reserved.</p>
                </div>
                <div class="col-md-6">
                    <div class="d-flex justify-content-md-end justify-content-center mt-3 mt-md-0">
                        <a href="#" class="text-muted text-decoration-none me-4">
                            <i class="fas fa-question-circle me-1"></i>Help
                        </a>
                        <a href="#" class="text-muted text-decoration-none me-4">
                            <i class="fas fa-shield-alt me-1"></i>Privacy
                        </a>
                        <a href="#" class="text-muted text-decoration-none">
                            <i class="fas fa-file-alt me-1"></i>Terms
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <!-- Bootstrap 5 JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
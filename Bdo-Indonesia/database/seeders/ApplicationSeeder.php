<?php

namespace Database\Seeders;

use App\Models\Application;
use Illuminate\Database\Seeder;

class ApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $applications = [
            [
                'name' => 'BDO Audit System',
                'slug' => 'bdo-audit',
                'description' => 'Comprehensive audit management system for BDO Indonesia operations.',
                'url' => 'https://audit.bdo.co.id',
                'icon' => null,
                'category' => 'audit',
                'is_active' => true,
                'requires_sso' => true,
                'permissions' => ['audit.view', 'audit.create'],
                'sort_order' => 1,
            ],
            [
                'name' => 'HR Management',
                'slug' => 'hr-system',
                'description' => 'Human resources management and employee portal.',
                'url' => 'https://hr.bdo.co.id',
                'icon' => null,
                'category' => 'hr',
                'is_active' => true,
                'requires_sso' => true,
                'permissions' => ['hr.view'],
                'sort_order' => 2,
            ],
            [
                'name' => 'Financial Reporting',
                'slug' => 'finance-reports',
                'description' => 'Financial reporting and analysis dashboard.',
                'url' => 'https://finance.bdo.co.id',
                'icon' => null,
                'category' => 'finance',
                'is_active' => true,
                'requires_sso' => true,
                'permissions' => ['finance.view', 'finance.reports'],
                'sort_order' => 3,
            ],
            [
                'name' => 'Document Management',
                'slug' => 'document-system',
                'description' => 'Centralized document storage and management system.',
                'url' => 'https://docs.bdo.co.id',
                'icon' => null,
                'category' => 'tools',
                'is_active' => true,
                'requires_sso' => false,
                'permissions' => ['docs.view'],
                'sort_order' => 4,
            ],
            [
                'name' => 'Client Portal',
                'slug' => 'client-portal',
                'description' => 'Client communication and project tracking portal.',
                'url' => 'https://client.bdo.co.id',
                'icon' => null,
                'category' => 'client',
                'is_active' => true,
                'requires_sso' => true,
                'permissions' => ['client.view', 'client.communicate'],
                'sort_order' => 5,
            ],
            [
                'name' => 'Training Center',
                'slug' => 'training-center',
                'description' => 'Employee training and development platform.',
                'url' => 'https://training.bdo.co.id',
                'icon' => null,
                'category' => 'hr',
                'is_active' => true,
                'requires_sso' => true,
                'permissions' => ['training.view'],
                'sort_order' => 6,
            ],
        ];

        foreach ($applications as $app) {
            Application::create($app);
        }
    }
}
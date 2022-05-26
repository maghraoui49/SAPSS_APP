export const navbarData = [
  {
    routeLink: 'dashboard',
    icon: 'fal fa-home',
    label: 'Dashboard'
  },
  {
    routeLink: 'application',
    icon: 'fas fa-th',
    label: 'Application'
  },
  {
    routeLink: 'data-architecture',
    icon: 'fas fa-sitemap',
    label: 'Données Architecture',
    submenuLevel1: [
      {
        routeLink: '',
        icon: 'fal fa-cog',
        label: 'Scole',
      },
      {
        routeLink: '',
        icon: 'fas fa-cog',
        label: 'Service',

      }
      ,
      {
        routeLink: '',
        icon: 'fas fa-file-chart-line',
        label: 'Topic Fonctionnel',

      }
      ,
      {
        routeLink: '',
        icon: 'fas fa-briefcase',
        label: 'Objet Metier',

      }
    ]
  },
  {
    routeLink: 'app-decomessione',
    icon: 'fal fa-tags',
    label: 'Application Decomissionee'
  },
  {
    routeLink: 'create-application',
    icon: 'fas fa-plus-square',
    label: 'Créer Application'
  },
  {
    routeLink: 'edit-liste',
    icon: 'fas fa-edit',
    label: 'Editer Liste'
  },
  {
    routeLink: 'lister-application',
    icon: 'fas fa-bars',
    label: 'Lister Applications'
  },


];
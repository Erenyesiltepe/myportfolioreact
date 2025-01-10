interface ProjectData {
  id: string;
  title: string;
  about: string;
  category: 'coding' | 'hobby';
  link: string;
  assets: {
    type: 'image' | '3d';
    url: string;
  }[];
}

declare module '*/projects_data.json' {
  const value: { projects: ProjectData[] };
  export default value;
} 
document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;

    // 生活照片数据
    const photos = [
        {
            src: 'static/hobby/photo1.jpg',
            caption: '旅行中的风景',
            aspectRatio: 4/3
        },
        {
            src: 'static/hobby/photo2.jpg',
            caption: '江南水乡',
            aspectRatio: 3/4
        },
        {
            src: 'static/hobby/photo3.jpg',
            caption: '美食探索',
            aspectRatio: 1/1
        },
        {
            src: 'static/hobby/photo4.jpg',
            caption: '生活街拍',
            aspectRatio: 3/4
        },
        {
            src: 'static/hobby/photo5.jpg',
            caption: '山间徒步',
            aspectRatio: 4/3
        },
        {
            src: 'static/hobby/photo6.jpg',
            caption: '生活碎片',
            aspectRatio: 4/3
        }
    ];

    // 创建照片画廊元素
    photos.forEach(photo => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.caption;
        img.style.aspectRatio = photo.aspectRatio;
        
        const caption = document.createElement('div');
        caption.className = 'gallery-caption';
        caption.textContent = photo.caption;
        
        item.appendChild(img);
        item.appendChild(caption);
        gallery.appendChild(item);
    });

    // 初始化 Masonry 布局
    imagesLoaded(gallery, function() {
        new Masonry(gallery, {
            itemSelector: '.gallery-item',
            columnWidth: '.gallery-item',
            percentPosition: true,
            gutter: 16
        });
    });

    // 点击照片放大预览
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const modal = document.createElement('div');
            modal.className = 'photo-modal';
            
            const modalImg = document.createElement('img');
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            // 添加关闭功能
            modal.addEventListener('click', function() {
                this.remove();
            });
        });
    });

    // 添加照片模态窗口样式
    const style = document.createElement('style');
    style.textContent = `
        .photo-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        }
        
        .photo-modal img {
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}); 